import mongoose from "mongoose";

const customsSchema = mongoose.Schema({

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
        type: mongoose.Schema.Types.ObjectId, ref: 'CustomsCategory',
    }],

}, { timestamps: true });

export const Customs = mongoose.model('Customs', customsSchema);