import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RelatedProducts = ({ products, title, calculateDiscountPrice }) => {
  const getNumericPrice = (priceStr) => {
    if (typeof priceStr === "number") {
      return priceStr;
    }
    return parseInt(String(priceStr).replace(/\D/g, "")) || 0;
  };

  const formatPrice = (price) => {
    const numericPrice = getNumericPrice(price);
    return numericPrice.toLocaleString('vi-VN') + 'đ';
  };

  // Điều chỉnh hàm calculateDiscountPrice để đảm bảo định dạng đúng
  const formatDiscountPrice = (price, discount) => {
    // Sử dụng hàm được truyền từ trang cha
    const discountedValue = calculateDiscountPrice(price, discount);
    // Định dạng kết quả
    return typeof discountedValue === 'number' 
      ? discountedValue.toLocaleString('vi-VN') + 'đ'
      : discountedValue;
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
            size={14}
          />
        ))}
        <span className="ml-1 text-xs font-medium text-gray-600">({rating})</span>
      </div>
    );
  };

  // Hàm để lấy hình ảnh sản phẩm
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    } 
    else if (product.image) {
      return product.image;
    } 
    else {
      return "https://via.placeholder.com/400x500?text=No+Image";
    }
  };

  return (
    <div className="my-16">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">
          {title || "Sản phẩm tương tự"}
        </h2>
        <div className="w-20 h-1 bg-blue-600 rounded mb-3"></div>
        <p className="max-w-2xl text-gray-600">
          Dựa trên lịch sử mua hàng và sở thích của bạn
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            key={product.id}
            className="bg-white rounded-lg shadow-md h-full overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/product/${product.id}`}>
              <div
                className="overflow-hidden relative"
                style={{ height: "220px" }}
              >
                {product.isNew && (
                  <div className="absolute top-2 left-2 z-10 px-2.5 py-1 text-xs rounded-md font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                    Mới
                  </div>
                )}

                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 z-10 px-2.5 py-1 text-xs rounded-md font-medium bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm">
                    -{product.discount}%
                  </div>
                )}

                <img
                  src={getProductImage(product)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x500?text=No+Image";
                  }}
                />
              </div>

              <div className="p-4 text-center">
                <div className="mb-2 flex justify-center">
                  {renderRating(product.rating)}
                </div>
                
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors text-gray-900">
                  {product.name}
                </h3>

                <div className="flex justify-center items-center mt-3">
                  {product.discount > 0 ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500 text-sm font-normal">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatDiscountPrice(product.price, product.discount)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    Xem chi tiết
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  products: PropTypes.array.isRequired,
  title: PropTypes.string,
  calculateDiscountPrice: PropTypes.func.isRequired
};

export default RelatedProducts;