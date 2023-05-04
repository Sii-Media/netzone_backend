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
    description: {
        type: String,
        required: true,
    },

    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DevicesCategories"
    },
    year: {
        type: Date,
    },
    property: String,
    images: [String],
    vedio: String,
});



export const DeviceItem = mongoose.model('DeviceItems', DeviceItemSchema);