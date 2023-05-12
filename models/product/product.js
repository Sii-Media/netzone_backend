import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    categoty: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    images: [String],
    vedioUrl: String,
    guarantee: Boolean,
    props: String,
    madeIn: String,
    year: Date,





});



export const Product = mongoose.model('Products', ProductSchema);