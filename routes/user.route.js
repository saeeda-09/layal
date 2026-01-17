import express from "express";
import {getUsers, updateUser, deleteUser} from "../controllers/user.controller.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticate, authorizeAdmin, getUsers);
router.put('/:id', authenticate, authorizeAdmin, updateUser);
router.delete('/:id', authenticate, authorizeAdmin, deleteUser);

export default router