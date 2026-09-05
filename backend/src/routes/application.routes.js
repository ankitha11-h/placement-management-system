import express from 'express';
import { getApplications, createApplication } from '../controllers/application.controllers.js';

const router = express.Router();

router.get('/', getApplications);

router.post('/', createApplication);

export default router;