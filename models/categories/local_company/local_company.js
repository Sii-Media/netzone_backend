import mongoose from "mongoose";

const localCompanySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    desc2: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    website: {
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

export const LocalCompany = mongoose.model('LocalCompany', localCompanySchema);