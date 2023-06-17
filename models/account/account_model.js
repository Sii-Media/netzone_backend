
import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // Add any additional fields specific to the account
    // For example: accountName, accountType, etc.
});

export const Account = mongoose.model("Account", accountSchema);
