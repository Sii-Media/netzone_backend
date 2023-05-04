import mongoose from "mongoose";


const WatchesItemsSchema = mongoose.Schema({
    watchesName: {
        type: String,
        required: true,
    },
    watchesImg: {
        type: String,
        required: true,
    },
    watchesPrice: {
        type: Number,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "WatchesCategory"
    },
    year: {
        type: Date,
    },
    property: String,
    images: [String],
    vedio: String,
});


export const WatchesItems = mongoose.model('WatchesItems', WatchesItemsSchema);