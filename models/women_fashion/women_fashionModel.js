import mongoose from "mongoose";


const womenfashionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WomenFashionCategories"
    },
    year: {
        type: Date,
    },
    property: String,
    images: [String],
    vedio: String,
},
    { timestamps: true }
);


export const WomenFashion = mongoose.model('WomenFashion', womenfashionSchema);