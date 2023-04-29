import mongoose from "mongoose";

const DeviceItemSchema = mongoose.Schema({
    deviceName: {
        type: String,
        required: true,
    },
    deviceImg: {
        type: String,
        required: true,
    },
    devicePrice: {
        type: Number,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DevicesCategories"
    }
});



export const DeviceItem = mongoose.model('DeviceItems', DeviceItemSchema);