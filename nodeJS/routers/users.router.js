import { verifyAdmin, verifyToken } from '../controller/middleware/auth.middleware.js';
import UserController from '../controller/users.controller.js';
import express from 'express'
const usersRouter=express.Router();

usersRouter.get('/getAll',verifyToken,verifyAdmin,UserController.getAll);
usersRouter.get('/getById/:id',verifyToken,UserController.getById);
usersRouter.post('/addUser',verifyToken,verifyAdmin,UserController.addUser);
usersRouter.put('/updateUser/:id',verifyToken,UserController.updateUser);
usersRouter.delete('/deleteUser/:id',verifyToken,verifyAdmin,UserController.deleteUser);
export default usersRouter;