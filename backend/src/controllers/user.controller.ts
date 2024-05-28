import { Request, Response } from "express"
import User from "../models/user"

export const registerController = async(req: Request, res: Response) => {
    try {
        let user = await User.findOne({ email: req.body.email })
    } catch (error) {
        console.log(error)
    }
}