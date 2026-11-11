import express from 'express';
import { getPlacementDrives, createPlacementDrive, getPlacementDriveById, updatePlacementDrive, deletePlacementDrive } from '../controllers/placementDrive.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import authorizeRoles from '../middlewares/role.middlewares.js';

const router = express.Router();

router.get('/', authMiddleware, authorizeRoles('student', 'company', 'admin'), getPlacementDrives);
router.post('/', authMiddleware, authorizeRoles('company', 'admin'), createPlacementDrive);
router.get('/:id', authMiddleware, authorizeRoles('student', 'company', 'admin'), getPlacementDriveById);
router.put('/:id', authMiddleware, authorizeRoles('company', 'admin'), updatePlacementDrive);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deletePlacementDrive);

export default router;