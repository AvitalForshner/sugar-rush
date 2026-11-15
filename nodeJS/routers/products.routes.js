import { verifyAdmin, verifyToken } from '../controller/middleware/auth.middleware.js';
import productController from '../controller/products.controller.js';
import express from 'express';

const productsRouter = express.Router();


productsRouter.get('/getAll', productController.getAll);
productsRouter.get('/getInactive', verifyToken, verifyAdmin, productController.getInactive);
productsRouter.get('/getByCategory/:categoryId', productController.getByCategory);
productsRouter.get('/getById/:id', productController.getById);
productsRouter.post('/addProduct', verifyToken, verifyAdmin, productController.addProduct);
productsRouter.put('/updateProduct/:id', verifyToken, verifyAdmin, productController.updateProduct);
productsRouter.delete('/deleteProduct/:id', verifyToken, verifyAdmin, productController.deleteProduct);

export default productsRouter;