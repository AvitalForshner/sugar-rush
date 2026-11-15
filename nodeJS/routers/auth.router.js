import express from 'express'
import AuthController from '../controller/auth.controller.js'
import { verifyToken } from '../controller/middleware/auth.middleware.js';
const authRouter=express.Router();
authRouter.post('/register',AuthController.register);
authRouter.post('/login',AuthController.login);
authRouter.get('/me',verifyToken,AuthController.getCurrentUser);
export default authRouter;