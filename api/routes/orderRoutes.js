
import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/orders", getOrders);

router.get("/orders/:id", getOrderById);
router.post("/orders", createOrder);
router.delete("/orders/:id", deleteOrder);

export default router;
