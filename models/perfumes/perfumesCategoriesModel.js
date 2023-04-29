import mongoose from "mongoose";


const PerfumesCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    perfumeList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PerfumeItems",
    }],
});



export const PerfumeCategory = mongoose.model('PerfumesCategory', PerfumesCategorySchema);