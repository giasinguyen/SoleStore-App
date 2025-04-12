const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    text: { type: String, required: true },
    idProduct: { type: String, required: true }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema, "reviews");

module.exports = Review;