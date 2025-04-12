const productsRouter = require("./products.router");
const homeRouter = require("./home.router");
const blogsRouter = require("./blogs.router");
const accountsRouter = require("./accounts.router");
const reviewsRouter = require("./reviews.router");

module.exports = (app) => {
    app.use("/", homeRouter);
    app.use("/products", productsRouter);
    app.use("/blogs", blogsRouter);
    app.use("/accounts", accountsRouter);
    app.use("/reviews", reviewsRouter);
};
