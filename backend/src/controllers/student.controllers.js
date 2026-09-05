import { Student } from '../models/student.models.js';
import asyncHandler from '../utils/asyncHandler.js';

const getStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();
    res.status(200).json(students);
});

const createStudent = asyncHandler(async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).json(student);
});

export { getStudents, createStudent };
