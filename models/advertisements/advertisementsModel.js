import mongoose from "mongoose";

const advertisementSchema = mongoose.Schema({
    advertisingTitle: {
        type: String,
        required: true,
    },
    advertisingStartDate: {
        type: String,
        required: true,
    },
    advertisingEndDate: {
        type: String,
        required: true,
    },
    advertisingDescription: {
        type: String,
        required: true,
    },
    advertisingImage: {
        type: String,
        required: true,
    },
    advertisingCountryAlphaCode: {
        type: String,
        required: true,
    },

});




export const Advertisement = mongoose.model('Advertisements', advertisementSchema);