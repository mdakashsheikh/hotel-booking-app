import bcrypt from 'bcryptjs';
import { Request, Response } from "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import { validationResult } from "express-validator";

export const registerController = async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()
        })
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if(user) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            })
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign(
            { userId: user.id }, 
            process.env.JWT_SECTER_KEY as string, {
                expiresIn: "1d"
            }
        )

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,

        })

        return res.status(201).json({
            success: true,
            message: "User registration successfully.",
            user
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong!"
        })
    }
}

export const loginController = async(req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()
        })
    }
    
    const { email, password } =  req.body;

    try {
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found please sign up"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        const token = jwt.sign(
            { userId: user.id}, 
            process.env.JWT_SECTER_KEY as string, {
                expiresIn: "1d"
            }
        )

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })

        res.status(200).json({
            succss: true,
            message: "Login successfully!",
            user
        })
    } catch (error) {
        console.log(error);
    }
}


export const validateTokenController = async(req: Request, res: Response) => {
    res.status(200).json({ userId: req.userId })
}