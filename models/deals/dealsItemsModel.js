import mongoose from "mongoose";

const DealsItemsSchema = mongoose.Schema({

    name: { type: String, required: true, },
    sallerName: { type: String, required: true, },
    endDate: { type: Date, required: true, },
    prevPrice: { type: Number, required: true, min: 1 },
    currentPrice: { type: Number, required: true, min: 1 },
}, { timestamps: true });



export const DealsItems = mongoose.model('DealsItems', DealsItemsSchema);