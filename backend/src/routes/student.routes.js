import express from 'express';
import { getStudents, createStudent, getStudentById, updateStudent } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent)
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)

export default router;