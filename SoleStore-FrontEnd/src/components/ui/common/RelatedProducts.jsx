import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ products, title, calculateDiscountPrice }) => {
  const renderRating = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }
            fill="currentColor"
            height="14"
            width="14"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
        <span className="ml-1 text-xs text-gray-600">{rating}</span>
      </div>
    );
  };

  // Hàm để lấy hình ảnh sản phẩm
  const getProductImage = (product) => {
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
    <div className="my-12">
      <div className="flex flex-col items-center mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {title || "Sản phẩm tương tự"}
        </h2>
        <p className="max-w-2xl text-gray-600 text-sm">
          Dựa trên lịch sử mua hàng và sở thích của bạn
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="bg-white rounded-lg shadow-sm h-full overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div
              className="overflow-hidden relative"
              style={{ height: "180px" }}
            >
              {product.isNew && (
                <div className="absolute top-2 left-2 z-10 px-2 py-1 text-xs rounded-md font-medium bg-blue-600 text-white">
                  Mới
                </div>
              )}

              {product.discount > 0 && (
                <div className="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded-md font-medium bg-red-500 text-white">
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

            <div className="p-3 text-center">
              <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                {product.name}
              </h3>

              <div className="mb-1 flex justify-center">
                {renderRating(product.rating)}
              </div>

              <div className="flex justify-center items-center">
                {product.discount > 0 ? (
                  <>
                    <p className="text-xs text-gray-400 line-through mr-2">
                      {product.price}
                    </p>
                    <p className="text-sm text-blue-600 font-bold">
                      {calculateDiscountPrice(product.price, product.discount)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-blue-600 font-bold">{product.price}</p>
                )}
              </div>
            </div>
          </Link>
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