import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        sparse: true
    },

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
