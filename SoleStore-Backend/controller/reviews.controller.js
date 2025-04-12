const Reviews = require("../models/reviews.model")

module.exports.index = async (req, res) => {
    const reviews = await Reviews.find();
    res.json(reviews);
}