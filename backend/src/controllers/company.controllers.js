import { Company } from "../models/company.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createCompany = asyncHandler(async (req, res) => {
    const company = await Company.create(req.body);
    res.status(201).json(company);
});

const getCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find();
    res.status(200).json(companies);
});
export { createCompany, getCompanies };