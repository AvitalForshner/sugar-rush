import orderController from '../controller/orders.controller.js'
import express from 'express'
import { verifyAdmin, verifyToken } from '../controller/middleware/auth.middleware.js';
const ordersRouter=express.Router();

ordersRouter.get('/getAll',verifyToken,verifyAdmin,orderController.getAll);
ordersRouter.get('/myOrders', verifyToken, orderController.getMyOrders);
ordersRouter.get('/bestSellers', orderController.getBestSellers);
ordersRouter.get('/getById/:id',verifyToken,orderController.getById);
ordersRouter.post('/addOrder',verifyToken,orderController.addOrder);
ordersRouter.put('/updateOrder/:id',verifyToken,orderController.updateOrder);
ordersRouter.delete('/deleteOrder/:id',verifyToken,verifyAdmin,orderController.deleteOrder);
export default ordersRouter;