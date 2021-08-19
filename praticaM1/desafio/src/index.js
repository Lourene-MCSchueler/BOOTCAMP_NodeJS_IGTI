import express from 'express';
import orderRouter from '../src/order/routes.js';

const app = express();

app.use(express.json());
app.use("/order", orderRouter);


app.listen(3000, () => console.log("Server running!"))