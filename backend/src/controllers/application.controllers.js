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
    const applications = await Application
        .find()
        .populate('student')
        .populate({
            path: 'placementDrive',
            populate: {
                path: 'company',
            }
        })
    res.status(200).json({
        success: true,
        message: "Applications fetched successfully",
        data: applications
    });
});

const getApplicationById = asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id);
    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Application fetched successfully",
        data: application
    });
});

const updateApplication = asyncHandler(async (req, res) => {
    const { status, remarks } = req.body;
    const application = await Application.findByIdAndUpdate(req.params.id, { status, remarks }, { new: true, runValidators: true });
    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Application updated successfully",
        data: application
    });
});

const deleteApplication = asyncHandler(async (req, res) => {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) {
        return res.status(404).json({
            success: false,
            message: "Application not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Application deleted successfully",
        data: application
    });
});

export { createApplication, getApplications, getApplicationById, updateApplication, deleteApplication };

