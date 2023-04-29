import mongoose from "mongoose";

const DevicesCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    deviceList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeviceItems",
    }],
});



export const DevicesCategories = mongoose.model('DevicesCategories', DevicesCategoriesSchema);