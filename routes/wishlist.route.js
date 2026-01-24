import express from "express";
import {addToWishlist, getMyWishlist, removeFromWishlist} from "../controllers/wishlist.controller.js";
import {authenticate} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, addToWishlist);
router.get("/", authenticate, getMyWishlist);
router.delete("/:id", authenticate, removeFromWishlist);

export default router;