import CategoryController from "../controller/categories.controller.js";
import express from 'express'
import { verifyAdmin, verifyToken } from "../controller/middleware/auth.middleware.js";
const categoriesRouter=express.Router();

categoriesRouter.get('/getAll',CategoryController.getAll);
categoriesRouter.get('/getById/:id',CategoryController.getById);
categoriesRouter.post('/addCategory',verifyToken,verifyAdmin,CategoryController.addCategory);
categoriesRouter.put('/updateCategory/:id',verifyToken,verifyAdmin,CategoryController.updateCategory);
categoriesRouter.delete('/deleteCategory/:id',verifyToken,verifyAdmin,CategoryController.deleteCategory);
export default categoriesRouter;