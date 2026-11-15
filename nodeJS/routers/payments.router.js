import paymentController from '../controller/payments.controller.js';
import express from 'express';
import { verifyAdmin, verifyToken } from '../controller/middleware/auth.middleware.js';

const paymentsRouter = express.Router();

paymentsRouter.get('/getAll', verifyToken, verifyAdmin, paymentController.getAll);
paymentsRouter.get('/getById/:id', verifyToken, paymentController.getById);
paymentsRouter.post('/addPayment', verifyToken, paymentController.addPayment);
paymentsRouter.put('/updatePayment/:id', verifyToken, verifyAdmin, paymentController.updatePayment);
paymentsRouter.delete('/deletePayment/:id', verifyToken, verifyAdmin, paymentController.deletePayment);

export default paymentsRouter;