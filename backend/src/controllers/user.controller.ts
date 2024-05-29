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

        res.cookie("auth_tokken", token, {
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

    try {
        
    } catch (error) {
        console.log(error);
    }
}