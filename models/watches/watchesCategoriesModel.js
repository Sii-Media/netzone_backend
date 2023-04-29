import mongoose from "mongoose";


const WatchesCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    watchesList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "WatchesItems",
    }],
});



export const WatchesCategory = mongoose.model('WatchesCategory', WatchesCategorySchema);