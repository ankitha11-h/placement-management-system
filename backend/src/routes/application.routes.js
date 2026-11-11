import express from 'express';
import { getApplications, createApplication, getApplicationById, updateApplication, deleteApplication } from '../controllers/application.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import authorizeRoles from '../middlewares/role.middlewares.js';

const router = express.Router();

router.get('/', authMiddleware, authorizeRoles('student', 'company', 'admin'), getApplications);
router.post('/', authMiddleware, authorizeRoles('student'), createApplication);
router.get('/:id', authMiddleware, authorizeRoles('student', 'company', 'admin'), getApplicationById);
router.put('/:id', authMiddleware, authorizeRoles('company', 'admin'), updateApplication);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteApplication);

export default router;