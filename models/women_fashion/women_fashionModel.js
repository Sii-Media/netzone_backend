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
    }
},
    { timestamps: true }
);


export const WomenFashion = mongoose.model('WomenFashion', womenfashionSchema);