import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,

    },
    firstMobile: {
        type: String,
    },

    secondeMobile: {
        type: String,
    },
    thirdMobile: {
        type: String,
    },
    subcategory: String,
    country: String,
    address: String,
    isFreeZoon: Boolean,
    businessLicense: String,
    companyProductsNumber: Number,
    sellType: String,
    toCountry: String,
    profilePhoto: String,
    banerPhoto: String,

},
    { timestamps: true }
);

export default mongoose.model("User", userSchema);