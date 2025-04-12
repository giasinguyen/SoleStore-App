const Accounts = require("../models/accounts.model")

module.exports.index = async (req, res) => {
    const account = await Accounts.find();
    res.json(account);
}