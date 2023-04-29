import mongoose from "mongoose";


const womenFashionCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WomenFashion',
        required: true,
    }]
});



export const WomenFashionCategories = mongoose.model('WomenFashionCategories', womenFashionCategoriesSchema);