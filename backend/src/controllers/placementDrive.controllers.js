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

export { createPlacementDrive, getPlacementDrives };