import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./database.js";
import categoriesRouter from './routers/categories.router.js';
import userRouter from './routers/users.router.js';
import ordersRouter from './routers/orders.router.js';
import paymentsRouter from './routers/payments.router.js';
import productsRouter from './routers/products.routes.js';
import shoppingCartsRouter from './routers/shoppingCarts.router.js';
import authRouter from './routers/auth.router.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

await connectDB();

app.use('/categories', categoriesRouter);
app.use('/users', userRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/products', productsRouter);
app.use('/shoppingCarts', shoppingCartsRouter);

app.use('/auth', authRouter);

app.listen(port, () => console.log(`app listening on http://localhost:${port}`));