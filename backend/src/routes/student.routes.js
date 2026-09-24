import express from 'express';
import { getStudents, createStudent, getStudentById, updateStudent, deleteStudent } from '../controllers/student.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import authorizeRoles from '../middlewares/role.middlewares.js';

const router = express.Router();

router.get('/', authMiddleware, getStudents);
router.post('/', createStudent)
router.get('/:id', getStudentById)
router.put('/:id', updateStudent)
router.delete('/:id', deleteStudent)

export default router;