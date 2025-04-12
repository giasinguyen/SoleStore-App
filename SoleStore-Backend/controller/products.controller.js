const Products = require("../models/products.model");
const Reviews = require("../models/reviews.model");
const productsHelper = require("../helpers/products");

module.exports.index = async (req, res) => {
    try {
        const products = await Products.find();
        const allReviews = await Reviews.find();

        const productsWithRating = products.map(product => {
            const reviewsForProduct = allReviews.filter(review => {
                const match = parseInt(review.idProduct) === parseInt(product.id); // ép kiểu
                if (match) {
                    console.log("✔ Match: Product ID:", product.id, "| Review ID Product:", review.idProduct);
                }
                return match;
            });

            let avgRating = 0;
            if (reviewsForProduct.length > 0) {
                const totalRating = reviewsForProduct.reduce((sum, r) => sum + r.rating, 0);
                avgRating = Math.round(totalRating / reviewsForProduct.length);
            }

            return {
                ...product.toObject(),
                rating: avgRating,
                reviewCount: reviewsForProduct.length
            };
        });

        const newProducts = productsHelper.priceNewproducts(productsWithRating);
        res.json(newProducts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm." });
    }
};

