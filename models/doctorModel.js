import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    firstName: {
        type: String,
        require: [true, 'first name is required']
    },
    lastName: {
        type: String,
        require: [true, 'last name is required']
    },
    phone: {
        type: String,
        require: [true, 'phone number is required']
    },
    email: {
        type: String,
        require: [true, 'eamil is required']
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        require: [true, 'address is required']
    },
    specailization: {
        type: String,
        required: [true, 'specailization is required']
    },
    experience: {
        type: String,
        required: [true, 'experience is required']
    },
    fessPerConsultation: {
        type: Number,
        required: [true, 'fee is required']
    },
    status: {
        type: String,
        default: 'pending',
    },
    timing: {
        type: Object,
        required: [true, 'work schecual is required']
    },
}, { timestamps: true })



export default mongoose.model("doctors", doctorSchema);