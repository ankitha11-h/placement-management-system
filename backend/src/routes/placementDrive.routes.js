import express from 'express';
import { getPlacementDrives, createPlacementDrive, getPlacementDriveById, updatePlacementDrive, deletePlacementDrive } from '../controllers/placementDrive.controllers.js';

const router = express.Router();

router.get('/', getPlacementDrives);
router.post('/', createPlacementDrive);
router.get('/:id', getPlacementDriveById);
router.put('/:id', updatePlacementDrive);
router.delete('/:id', deletePlacementDrive);

export default router;