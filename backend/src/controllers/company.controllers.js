import { Company } from "../models/company.models.js";
import { User } from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";

const createCompany = asyncHandler(async (req, res) => {
    let companyData;

    if (req.user.role === 'company') {
        const existingProfile = await Company.findOne({
            user: req.user.userId
        });

        if (existingProfile) {
            return res.status(409).json({
                success: false,
                message: "Company profile already exists"
            });
        }

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User account not found"
            });
        }

        companyData = {
            user: user._id,
            name: user.name,
            email: user.email,
            phone: req.body.phone,
            website: req.body.website,
            location: req.body.location,
            description: req.body.description
        };
    } else {
        const { user, ...data } = req.body;
        companyData = data;
    }

    const company = await Company.create(companyData);

    res.status(201).json(company);
});


const getCompanies = asyncHandler(async (req, res) => {
    let companies;

    if (req.user.role === 'company') {
        companies = await Company.find({
            user: req.user.userId
        });
    } else {
        companies = await Company.find();
    }

    res.status(200).json(companies);
});


const getCompanyById = asyncHandler(async (req, res) => {
    let company;

    if (req.user.role === 'company') {
        company = await Company.findOne({
            _id: req.params.id,
            user: req.user.userId
        });
    } else {
        company = await Company.findById(req.params.id);
    }

    if (!company) {
        return res.status(404).json({
            success: false,
            message: "Company not found"
        });
    }

    res.status(200).json(company);
});


const updateCompany = asyncHandler(async (req, res) => {
    let company;
    let updateData;

    if (req.user.role === 'company') {
        const { phone, website, location, description } = req.body;

        updateData = {
            phone,
            website,
            location,
            description
        };

        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        company = await Company.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
    } else {
        const { user, ...data } = req.body;
        updateData = data;

        company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
    }

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

export {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
};
