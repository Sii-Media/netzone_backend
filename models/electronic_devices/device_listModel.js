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
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ElectronicDevices"
    },
    year: {
        type: Date,
    },
    property: String,
    images: [String],
    vedio: String,
},
    { timestamps: true },
);

export const DeviceList = mongoose.model('DeviceList', deviceListSchema); 