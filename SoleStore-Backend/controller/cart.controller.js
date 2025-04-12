const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")
const productHelper = require("../../helpers/products")

// [GET] /cart
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    })

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const product_id = item.product_id;
            const productInfo = await Product.findOne({
                _id: product_id,
            }).select("title thumbnail slug price discountPercentage")

            //Giá mới cho từng sản phẩm
            productInfo.priceNew = productHelper.priceNewproduct(productInfo)
            //Tổng tiền từng sản phẩm
            item.totalPrice = productInfo.priceNew * item.quantity
            //Gán ds sản phẩm cho biến productInfo
            item.productInfo = productInfo

        }
    }
    //Tổng tiền tất cả sản phẩm
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)
    res.render("client/pages/cart/index.pug", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    });

}
// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    const productId = req.params.productId; // req.params là lấy giá trị từ trên path
    const quantity = parseInt(req.body.quantity); // req.body là lấy giá trị từ form
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    })
    const existProduct = cart.products.find(item => item.product_id == productId)
    if (existProduct) {
        const quantityNew = quantity + existProduct.quantity;
        await Cart.updateOne({
            _id: cartId,
            'products.product_id': productId
        }, {
            $set: {
                'products.$.quantity': quantityNew
            }
        }
        )
        req.flash("success", "Đã thêm sản phẩm vào giỏ hàng !")
        res.redirect("back");
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }

        await Cart.updateOne({
            _id: cartId
        }, {
            $push: { products: objectCart }
        })

        req.flash("success", "Đã thêm sản phẩm vào giỏ hàng !")
        res.redirect("back");
    }

}
// [GET] /cart/delete/:productId
module.exports.deleteItem = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId
    const cart = await Cart.findOne({
        _id: cartId
    })
    const existProduct = cart.products.find(item => item.product_id == productId)
    if (existProduct) {
        await Cart.updateOne({
            _id: cartId
        }, {
            $pull: { products: { product_id: productId } }
        })
    }

    req.flash("success", "Đã xóa sản phẩm thành công!")
    res.redirect("back");
}
// [GET] /cart/update/:productId/:quntity
module.exports.updateItem = async (req, res) => {
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    })
    await Cart.updateOne({
        _id: cartId,
        'products.product_id': productId
    }, {
        $set: {
            'products.$.quantity': quantity
        }
    }
    )
    req.flash("success", "Cập nhât số lượng thành công")
    res.redirect("back");
}
