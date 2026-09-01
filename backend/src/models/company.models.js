import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String,
        required: true
    },

    website: {
        type: String
    },

    location: {
        type: String,
        required: true
    },

    description: {
        type: String
    }
}, { timestamps: true });

export const Company = mongoose.model("Company", companySchema);
