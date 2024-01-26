const mongoose = require("mongoose");

// schema
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // userId
        ref: "User", // for populating
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

// model
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    Account
};