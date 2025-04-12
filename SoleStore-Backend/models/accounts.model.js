const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
}, { timestamps: true });

const Account = mongoose.model("Account", accountSchema, "accounts");

module.exports = Account;