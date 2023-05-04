import mongoose from "mongoose";


const menfashionSchema = mongoose.Schema({
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
        ref: "MenFashionCategories"
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


export const MenFashion = mongoose.model('MenFashion', menfashionSchema);