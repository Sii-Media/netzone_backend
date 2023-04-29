import mongoose from "mongoose";

const governmentalCompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
},
    { timestamps: true }
);

export const GovernmentalCompany = mongoose.model('Governmental', governmentalCompanySchema);