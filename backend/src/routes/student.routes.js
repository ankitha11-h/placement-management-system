import express from 'express';
import { getStudents, createStudent, getStudentById, updateStudent, deleteStudent } from '../controllers/student.controllers.js';

const router = express.Router();

router.get('/', getStudents);
router.post('/', createStudent)
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router;