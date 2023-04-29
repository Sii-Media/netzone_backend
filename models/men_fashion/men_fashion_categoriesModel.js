import mongoose from "mongoose";


const menFashionCategoriesSchema = mongoose.Schema({
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
        ref: 'MenFashion',
        required: true,
    }]
});



export const MenFashionCategories = mongoose.model('MenFashionCategories', menFashionCategoriesSchema);