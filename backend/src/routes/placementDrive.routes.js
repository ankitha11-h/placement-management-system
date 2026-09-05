import express from 'express';
import { getPlacementDrives, createPlacementDrive } from '../controllers/placementDrive.controllers.js';

const router = express.Router();

router.get('/', getPlacementDrives);

router.post('/', createPlacementDrive);

export default router;