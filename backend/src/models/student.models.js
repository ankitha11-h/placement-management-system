import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
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

    usn: {
        type: String,
        required: true,
        unique: true
    },

    branch: {
        type: String,
        required: true
    },

    cgpa: {
        type: Number,
        required: true
    },

    graduationYear: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["not-placed", "placed"],
        default: "not-placed"
    },

}, { timestamps: true });

export const Student = mongoose.model('Student', studentSchema);