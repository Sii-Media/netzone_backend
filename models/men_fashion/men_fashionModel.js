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
    }
},
    { timestamps: true }
);


export const MenFashion = mongoose.model('MenFashion', menfashionSchema);