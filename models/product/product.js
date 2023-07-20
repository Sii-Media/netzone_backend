import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },


    // owner: {
    //     type: String,
    //     required: true,
    // },

    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepartmentsCategory',
        required: true,
    },
    condition: {
        type: String,
        enum: ['new', 'used'],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
    },
    images: [String],
    vedioUrl: String,
    gifUrl: String,
    guarantee: Boolean,
    address: String,
    madeIn: String,
    year: Date,
    discountPercentage: Number,
    priceAfterDiscount: Number,
    color: String,
    country: {
        type: String,
        required: true,
    },
});

export const Product = mongoose.model('Products', ProductSchema);