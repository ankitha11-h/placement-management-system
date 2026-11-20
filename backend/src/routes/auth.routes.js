import express from 'express';
import { registerUser, loginUser, createAdmin, createCompanyAccount } from '../controllers/auth.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import authorizeRoles from '../middlewares/role.middlewares.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/create-admin', createAdmin);
router.post('/create-company', authMiddleware, authorizeRoles('admin'), createCompanyAccount);

export default router;
