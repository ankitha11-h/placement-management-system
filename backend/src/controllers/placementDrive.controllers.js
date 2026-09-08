import { PlacementDrive } from "../models/placementDrive.models.js";
import asyncHandler from "../utils/asyncHandler.js"

const createPlacementDrive = asyncHandler(async (req, res) => {
    const placementDrive = await PlacementDrive.create(req.body);
    res.status(201).json(placementDrive);
})

const getPlacementDrives = asyncHandler(async (req, res) => {
    const placementDrives = await PlacementDrive.find();
    res.status(200).json(placementDrives);
})

const getPlacementDriveById = asyncHandler(async (req, res) => {
    const placementDrive = await PlacementDrive.findById(req.params.id);
    if (!placementDrive) {
        return res.status(404).json({
            success: false,
            message: "Placement drive not found"
        });
    }
    res.status(200).json(placementDrive);
});

const updatePlacementDrive = asyncHandler(async (req, res) => {
    const placementDrive = await PlacementDrive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!placementDrive) {
        return res.status(404).json({
            success: false,
            message: "Placement drive not found"
        });
    }
    res.status(200).json(placementDrive);
});

const deletePlacementDrive = asyncHandler(async (req, res) => {
    const placementDrive = await PlacementDrive.findByIdAndDelete(req.params.id);
    if (!placementDrive) {
        return res.status(404).json({
            success: false,
            message: "Placement drive not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Placement drive deleted successfully"
    });
});

export { createPlacementDrive, getPlacementDrives, getPlacementDriveById, updatePlacementDrive, deletePlacementDrive };