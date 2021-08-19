import express from 'express';
import OrderController from './controller.js';

const router = express.Router();

router.post("/", OrderController.createOrder);
router.put("/", OrderController.updateOrder);
router.patch("/", OrderController.updateDelivery);
router.delete("/:id", OrderController.deleteOrder);
router.get("/:id", OrderController.listOrder);
router.get("/client/name", OrderController.listByClient);
router.get("/product/name", OrderController.listByProduct);
router.get("/product/moreOrder", OrderController.moreOrderByProduct);

export default router;