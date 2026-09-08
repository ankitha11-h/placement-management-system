import express from 'express';
import { getApplications, createApplication, getApplicationById, updateApplication, deleteApplication } from '../controllers/application.controllers.js';

const router = express.Router();

router.get('/', getApplications);
router.post('/', createApplication);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);


export default router;