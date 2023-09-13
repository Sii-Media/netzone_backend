import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            qty: {
                type: Number,
                required: true,
            },
        }
    ],
    grandTotal: {
        type: Number,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true,
    },
    transactionId: {
        type: String,
    },
    orderEvent: {
        type: String,
    }
},
    {
        timestamps: true,
    }
);



export const Order = mongoose.model('Orders', orderSchema);