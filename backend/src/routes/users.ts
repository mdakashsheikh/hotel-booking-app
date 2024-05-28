import express from 'express'
import { registerController } from '../controllers/user.controller';

const router = express.Router();

router.post("/register", registerController)


export default router;