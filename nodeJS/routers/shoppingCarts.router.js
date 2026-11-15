import shoppingCartController from '../controller/shoppingCarts.controller.js'
import express from 'express'
import { verifyAdmin, verifyToken } from '../controller/middleware/auth.middleware.js';
const shoppingCartsRouter=express.Router();

shoppingCartsRouter.get('/getAll',verifyToken,verifyAdmin,shoppingCartController.getAll);
shoppingCartsRouter.get('/getById/:id',verifyToken,shoppingCartController.getById);
shoppingCartsRouter.post('/addShoppingCart',verifyToken,shoppingCartController.addShoppingCart);
shoppingCartsRouter.put('/updateShoppingCart/:id',verifyToken,shoppingCartController.updateShoppingCart);
shoppingCartsRouter.delete('/deleteShoppingCart/:id',verifyToken,shoppingCartController.deleteShoppingCart);
export default shoppingCartsRouter;