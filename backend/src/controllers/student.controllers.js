
import { Student } from '../models/student.models.js';
import { User } from '../models/user.models.js';
import asyncHandler from '../utils/asyncHandler.js';

const getStudents = asyncHandler(async (req, res) => {
    let students;

    if (req.user.role === 'admin') {
        students = await Student.find();
    } else {
        students = await Student.find({ user: req.user.userId });
    }

    res.status(200).json(students);
});

const createStudent = asyncHandler(async (req, res) => {
    let studentData;

    if (req.user.role === 'student') {
        const existingProfile = await Student.findOne({
            user: req.user.userId
        });

        if (existingProfile) {
            return res.status(409).json({
                success: false,
                message: "Student profile already exists"
            });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account not found"
            });
        }

        studentData = {
            user: user._id,
            name: user.name,
            email: user.email,
            phone: req.body.phone,
            usn: req.body.usn,
            branch: req.body.branch,
            cgpa: req.body.cgpa,
            graduationYear: req.body.graduationYear
        };
    } else {
        const { user, ...data } = req.body;
        studentData = data;
    }

    const student = await Student.create(studentData);

    res.status(201).json(student);
});

const getStudentById = asyncHandler(async (req, res) => {
    let student;

    if (req.user.role === 'admin') {
        student = await Student.findById(req.params.id);
    } else {
        student = await Student.findOne({
            _id: req.params.id,
            user: req.user.userId
        });
    }

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});

const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Student deleted successfully"
    });
});

export {
    getStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent
};
