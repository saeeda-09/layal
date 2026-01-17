import express from 'express';
import { register, login, getProfile, logout } from '../controllers/auth.controller.js';
import { authenticate, validate } from '../middlewares/auth.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/profile', authenticate, getProfile);
router.post('/logout', authenticate, logout);

export default router