import mongoose from "mongoose";


const foodsCategoriesSchema = mongoose.Schema({
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
        ref: 'Foods',
        required: true,
    }]
},
    { timestamps: true },
);



export const FoodsCategories = mongoose.model('FoodsCategories', foodsCategoriesSchema);