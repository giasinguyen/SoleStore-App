module.exports.priceNewproducts = (products) => {
    const newProducts = products.map(item => {
        item.price = parseInt(item.originalPrice - (item.originalPrice * (item.discount / 100)).toFixed(0))
        console.log("Giá mới của san pham: ", item.price)
        return item;
    })
    return newProducts;
}
module.exports.priceNewproduct = (product) => {
    const price = parseInt(product.originalPrice - (product.originalPrice * (product.discount / 100)).toFixed(0))
    return price;
}