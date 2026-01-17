import express from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/', getProducts);
router.get("/:id", getProduct);
router.post('/', authenticate, authorizeAdmin, createProduct);
router.put('/:id', authenticate, authorizeAdmin, updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, deleteProduct);

export default router;