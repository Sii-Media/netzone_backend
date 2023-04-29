import mongoose from "mongoose";

const deviceListSchema = mongoose.Schema({
    deviceName: {
        type: String,
        required: true,
    },
    deviceImg: {
        type: String,
        required: true,
    },
    devicePrice: {
        type: String,
        required: true,
    },
},
    { timestamps: true },
);

export const DeviceList = mongoose.model('DeviceList', deviceListSchema); 