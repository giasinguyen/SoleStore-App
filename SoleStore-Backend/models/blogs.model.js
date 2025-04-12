const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true }
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema, "blogs");

module.exports = Blog;