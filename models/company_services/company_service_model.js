import mongoose from "mongoose";

const CompanyServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: String
});



export const CompanyServices = mongoose.model('CompanyServices', CompanyServiceSchema);