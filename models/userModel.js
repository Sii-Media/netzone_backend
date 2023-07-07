import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ['local_company', 'user', 'freezoon', 'factory', 'car', 'plans', 'sea_companies', 'news_agency'],

    },
    firstMobile: {
        type: String,
        required: true,
    },

    secondeMobile: {
        type: String,
    },
    thirdMobile: {
        type: String,
    },
    isFreeZoon: {
        type: Boolean,

    },
    deliverable: {
        type: Boolean,
    },
    subcategory: String,
    country: String,
    address: String,

    businessLicense: String,
    companyProductsNumber: Number,
    sellType: String,
    toCountry: String,
    profilePhoto: String,
    coverPhoto: String,
    banerPhoto: String,
    frontIdPhoto: String,
    backIdPhoto: String,
    bio: String,
    description: String,
    website: String,
    vehicles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vehicles',
            default: [],
        }
    ],
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            default: [],
        }
    ],
    selectedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            default: [],
        }
    ],
    stripeCustomerId: {
        type: String,
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                    required: true
                },
                quantity: { type: Number, required: true }
            }
        ]
    },
    favorites: {
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                },
            }
        ]
    },
    accounts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],



},
    {
        // Set the select option to exclude the password field by default
        toJSON: {
            select: '-password'
        }
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);