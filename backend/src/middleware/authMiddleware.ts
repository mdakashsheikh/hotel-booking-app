import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["auth_token"];
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized "
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userid
        next()
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unauthorized"
        })
    }
}

export default verifyToken