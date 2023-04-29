import mongoose from "mongoose";


const DealsCategoriesSchema = mongoose.Schema({

    name: { type: String, required: true, },
    dealsItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DealsItems",
    },]

}, { timestamps: true });



export const DealsCategories = mongoose.model('DealsCategory', DealsCategoriesSchema);