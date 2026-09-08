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

const getCompanyById = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);
    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company not found"
        });
    }
    res.status(200).json(company);
});

const updateCompany = asyncHandler(async (req, res) => {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company not found"
        });
    }
    res.status(200).json(company);
});

const deleteCompany = asyncHandler(async (req, res) => {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Company deleted successfully"
    });
});

export { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany };