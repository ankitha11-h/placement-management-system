import mongoose from 'mongoose'

const placementdriveSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },

    jobRole: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    salary: {
        type: Number,
        required: true
    },

    eligibleBranches: {
        type: [String],
        required: true
    },

    minimumCgpa: {
        type: Number,
        required: true
    },

    graduationYear: {
        type: Number,
        required: true
    },

    applicationDeadline: {
        type: Date,
        required: true
    },

    driveDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    }
}, { timestamps: true });

export const PlacementDrive = mongoose.model("PlacementDrive", placementdriveSchema)