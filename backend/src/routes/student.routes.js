import express from 'express';
import { getStudents, createStudent, getStudentById } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent)
router.get('/:id', getStudentById)

export default router;