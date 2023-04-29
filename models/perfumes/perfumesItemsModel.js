import mongoose from "mongoose";


const PerfumeItemsSchema = mongoose.Schema({
    perfumeName: {
        type: String,
        required: true,
    },
    perfumeImg: {
        type: String,
        required: true,
    },
    perfumePrice: {
        type: Number,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PerfumesCategory"
    }
});


export const PerfumeItems = mongoose.model('PerfumeItems', PerfumeItemsSchema);