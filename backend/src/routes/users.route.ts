import express from 'express'
import { loginController, registerController } from '../controllers/user.controller';
import { check } from 'express-validator'

const router = express.Router();

router.post("/register", [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6}),
], registerController)

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6}),
], loginController)

export default router;