import mongoose from "mongoose";

const electronicDeviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    deviceList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DeviceList',
            default: []
        }
    ],
},
    { timestamps: true },
);

export const ElectronicDevices = mongoose.model('ElectronicDevices', electronicDeviceSchema); 