import { Application } from "../models/application.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createApplication = asyncHandler(async (req, res) => {
    const application = await Application.create(req.body);
    res.status(201).json(application);
})

const getApplications = asyncHandler(async (req, res) => {
    const applications = await Application.find();
    res.status(200).json(applications);
})

export { createApplication, getApplications };