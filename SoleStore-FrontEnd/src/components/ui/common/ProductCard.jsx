import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { Button } from "react-bootstrap";

const ProductCard = ({ product }) => {
  const getNumericPrice = (priceStr) => {
    if (typeof priceStr === "number") {
      return priceStr;
    }
    return parseInt(String(priceStr).replace(/\D/g, "")) || 0;
  };

  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const calculateDiscountPrice = (price, discount) => {
    if (discount === 0) return price;
    const numericPrice = getNumericPrice(price);
    const discountAmount = numericPrice * (discount / 100);
    const finalPrice = numericPrice - discountAmount;
    return finalPrice.toLocaleString("vi-VN") + "đ";
  };

  const getCategoryLabel = (category) => {
    return category === "casual"
      ? "Dạo phố"
      : category === "formal"
        ? "Lịch sự"
        : "Bãi biển";
  };

  // Xác định hình ảnh để hiển thị từ dữ liệu sản phẩm
  const getProductImage = () => {
    // Nếu có mảng images, sử dụng ảnh đầu tiên
    if (product.images && product.images.length > 0) {
      return product.images[0];
    } 
    // Nếu có trường image, sử dụng trường đó
    else if (product.image) {
      return product.image;
    } 
    // Mặc định sử dụng hình ảnh placeholder
    else {
      return "https://via.placeholder.com/400x500?text=No+Image";
    }
  };

  return (
    <div className="product-card bg-white rounded-xl shadow-sm h-full overflow-hidden group">
      <div
        className="product-image-container overflow-hidden relative"
        style={{ height: "260px" }}
      >
        {product.isNew && (
          <div className="badge badge-new absolute top-2 left-2 z-10 px-2 py-1 rounded-md font-medium bg-blue-600 text-white">
            Mới
          </div>
        )}

        {product.discount > 0 && (
          <div className="badge badge-sale absolute top-2 right-2 z-10 px-2 py-1 rounded-md font-medium bg-red-500 text-white">
            -{product.discount}%
          </div>
        )}

        {product.bestSeller && (
          <div className="badge badge-bestseller absolute bottom-2 left-2 z-10 px-2 py-1 rounded-md font-medium bg-amber-500 text-white">
            Bán chạy
          </div>
        )}

        <img
          src={getProductImage()}
          className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={product.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x500?text=No+Image";
          }}
        />
      </div>

      <div className="text-center p-4">
        <div className="text-sm text-gray-500 mb-1 capitalize">
          {getCategoryLabel(product.category)}
        </div>
        <h3 className="font-bold text-lg mb-1 line-clamp-1 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="mb-1 flex justify-center">
          {renderRating(product.rating)}
        </div>

        <div className="text-sm text-gray-500 mb-2 flex justify-center items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-1"
            style={{
              backgroundColor:
                product.color === "Đen"
                  ? "black"
                  : product.color === "Trắng"
                    ? "white"
                    : product.color === "Nâu"
                      ? "brown"
                      : product.color === "Vàng"
                        ? "gold"
                        : "gray",
              border: product.color === "Trắng" ? "1px solid #ddd" : "none",
            }}
          ></span>
          {product.color}
        </div>

        <div className="flex justify-center items-center mb-3">
          {product.discount > 0 ? (
            <>
              <p className="text-gray-400 line-through mr-2">{product.price}</p>
              <p className="text-blue-600 font-bold">
                {calculateDiscountPrice(product.price, product.discount)}
              </p>
            </>
          ) : (
            <p className="text-blue-600 font-bold">{product.price}</p>
          )}
        </div>

        <Button 
          as={Link} 
          to={`/product/${product.id}`} 
          className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
        >
          <FaShoppingCart />
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    images: PropTypes.array,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    category: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
    discount: PropTypes.number,
    bestSeller: PropTypes.bool
  }).isRequired
};

export default ProductCard;