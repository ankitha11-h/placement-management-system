import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },

    placementDrive: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PlacementDrive',
        required: true
    },

    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'selected', 'rejected'],
        default: 'applied'
    },

    appliedAt: {
        type: Date,
        default: Date.now
    },

    remarks: {
        type: String
    }

}, { timestamps: true });

applicationSchema.index(
    { student: 1, placementDrive: 1 },
    { unique: true }
);

export const Application = mongoose.model('Application', applicationSchema);