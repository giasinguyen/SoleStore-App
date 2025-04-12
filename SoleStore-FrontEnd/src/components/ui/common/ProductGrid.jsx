            {/* Visual price range slider */}
import React from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 h-72 animate-pulse"
          >
            <div className="bg-gray-200 h-40 w-full rounded-md mb-4"></div>
            <div className="bg-gray-200 h-4 w-2/3 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-500">
          Không tìm thấy sản phẩm nào phù hợp với điều kiện tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number,
      reviews: PropTypes.number,
      discount: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
};

export default ProductGrid;