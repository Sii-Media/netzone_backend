import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },

},
    { timestamps: true }
);


export const News = mongoose.model('News', newsSchema);