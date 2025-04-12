const Blogs = require("../models/blogs.model")

module.exports.index = async (req, res) => {
  const blogs = await Blogs.find();
  res.json(blogs);
}