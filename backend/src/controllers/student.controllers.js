import { Student } from '../models/student.models.js';

const getStudents = (req, res) => {
    res.send("Students fetched successfully");
};

const createStudent = async (req, res) => {
    const student = await Student.create(req.body);

    res.status(201).json(student);
};

export { getStudents, createStudent };
