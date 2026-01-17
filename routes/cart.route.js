import express from "express";
import {getCarts, getCart, createCart, updateCart, deleteCart} from "../controllers/cart.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(authenticate);

router.get("/", getCarts);
router.get("/:id", getCart);
router.post("/", createCart);
router.put("/:id", updateCart);
router.delete("/:id", deleteCart);

export default router;