import { Application } from "../models/application.models.js";
import { Student } from "../models/student.models.js";
import { PlacementDrive } from "../models/placementDrive.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createApplication = asyncHandler(async (req, res) => {
    const { student, placementDrive } = req.body;

    const studentData = await Student.findById(student);

    if (!studentData) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const placementDriveData = await PlacementDrive.findById(placementDrive);

    if (!placementDriveData) {
        return res.status(404).json({
            success: false,
            message: "Placement drive not found"
        });
    }

    if (placementDriveData.status === "cancelled" || placementDriveData.status === "completed") {
        return res.status(400).json({
            success: false,
            message: "Applications are not allowed for this placement drive"
        });
    }

    if (studentData.cgpa < placementDriveData.minimumCgpa) {
        return res.status(400).json({
            success: false,
            message: "Student does not meet the minimum CGPA requirement"
        });
    }

    if (!placementDriveData.eligibleBranches.includes(studentData.branch)) {
        return res.status(400).json({
            success: false,
            message: "Student branch is not eligible for this placement drive"
        });
    }

    if (studentData.graduationYear !== placementDriveData.graduationYear) {
        return res.status(400).json({
            success: false,
            message: "Student graduation year is not eligible for this placement drive"
        });
    }

    if (studentData.status === "placed") {
        return res.status(400).json({
            success: false,
            message: "Placed students cannot apply for placement drives"
        });
    }

    if (new Date() > placementDriveData.applicationDeadline) {
        return res.status(400).json({
            success: false,
            message: "Application deadline has passed"
        });
    }

    const existingApplication = await Application.findOne({ student, placementDrive });

    if (existingApplication) {
        return res.status(400).json({
            success: false,
            message: "Student has already applied for this placement drive"
        });
    }

    const application = await Application.create({ student, placementDrive });

    res.status(201).json({
        success: true,
        message: "Application created successfully",
        data: application
    });
});

const getApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find();

    res.status(200).json({
        success: true,
        message: "Applications fetched successfully",
        data: applications
    });
});

export { createApplication, getApplications };

