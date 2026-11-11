import express from 'express';
import { getStudents, createStudent, getStudentById, updateStudent, deleteStudent } from '../controllers/student.controllers.js';
import authMiddleware from '../middlewares/auth.middlewares.js';
import authorizeRoles from '../middlewares/role.middlewares.js';

const router = express.Router();

router.get('/', authMiddleware, authorizeRoles('student', 'admin'), getStudents);
router.post('/', authMiddleware, authorizeRoles('admin'), createStudent);
router.get('/:id', authMiddleware, authorizeRoles('student', 'admin'), getStudentById);
router.put('/:id', authMiddleware, authorizeRoles('admin'), updateStudent);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteStudent);

export default router;