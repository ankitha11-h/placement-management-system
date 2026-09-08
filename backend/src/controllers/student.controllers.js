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

const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }
    res.status(200).json(student);
});

export { getStudents, createStudent, getStudentById };
