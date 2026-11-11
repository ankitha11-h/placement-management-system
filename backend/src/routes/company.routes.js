import express from 'express';
import { getCompanies, createCompany, getCompanyById, updateCompany, deleteCompany } from '../controllers/company.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import authorizeRoles from '../middlewares/role.middlewares.js';

const router = express.Router();

router.get('/', authMiddleware, authorizeRoles('student', 'company', 'admin'), getCompanies);
router.post('/', authMiddleware, authorizeRoles('company', 'admin'), createCompany);
router.get('/:id', authMiddleware, authorizeRoles('student', 'company', 'admin'), getCompanyById);
router.put('/:id', authMiddleware, authorizeRoles('company', 'admin'), updateCompany);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteCompany);

export default router;