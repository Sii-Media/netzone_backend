import mongoose from "mongoose";

const freezoonSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },

    img: {
        type: String,
        required: true,
    },
    freezoonplaces: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'CompanyCategory',
    }],

}, { timestamps: true });

export const Freezoon = mongoose.model('Freezoon', freezoonSchema);