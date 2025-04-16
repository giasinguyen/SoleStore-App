import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaStar,
} from "react-icons/fa";

const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  activeCategory,
  setActiveCategory,
  activeTab,
  setActiveTab,
  ratingFilter,
  setRatingFilter,
  brandFilters,
  setBrandFilters,
  brands,
  resetFilters,
  activeFilters,
}) => {
  const [showCategories, setShowCategories] = useState(true);
  const [showShoeTypes, setShowShoeTypes] = useState(true);
  const [showPriceRanges, setShowPriceRanges] = useState(true);
  const [showRatings, setShowRatings] = useState(true);
  const [showBrands, setShowBrands] = useState(true);

  const toggleBrandFilter = (brandName) => {
    if (brandFilters.includes(brandName)) {
      setBrandFilters(brandFilters.filter((brand) => brand !== brandName));
    } else {
      setBrandFilters([...brandFilters, brandName]);
    }
  };

  return (
    <div className="filter-container mb-4">
      <div className="search-bar mb-4 relative">
        <input
          type="text"
          className="w-full border rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {activeFilters.length > 0 && (
        <div className="active-filters mb-4">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <div
                key={index}
                className="active-filter flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                <span>{filter.label}</span>
                <button
                  onClick={() => filter.clear()}
                  className="ml-2 text-gray-500 hover:text-gray-800"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
            <button
              onClick={resetFilters}
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              Xóa tất cả
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap mb-4 gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("all")}
        >
          Tất cả
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "bestseller"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("bestseller")}
        >
          Bán chạy nhất
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "new"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("new")}
        >
          Mới
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            activeTab === "sale"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("sale")}
        >
          Giảm giá
        </button>
      </div>

      <div className="filters border rounded-md">
        <div className="filter-group border-b">
          <div
            className="filter-header flex justify-between items-center px-4 py-3 cursor-pointer"
            onClick={() => setShowCategories(!showCategories)}
          >
            <h3 className="font-medium">Danh mục</h3>
            {showCategories ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showCategories && (
            <div className="filter-options px-4 pb-3">
              <div
                className={`filter-option mb-1 cursor-pointer ${
                  activeCategory === "all" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setActiveCategory("all")}
              >
                Tất cả
              </div>
              <div
                className={`filter-option mb-1 cursor-pointer ${
                  activeCategory === "casual" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setActiveCategory("casual")}
              >
                Dạo phố
              </div>
              <div
                className={`filter-option mb-1 cursor-pointer ${
                  activeCategory === "formal" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setActiveCategory("formal")}
              >
                Lịch sự
              </div>
              <div
                className={`filter-option cursor-pointer ${
                  activeCategory === "beach" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setActiveCategory("beach")}
              >
                Bãi biển
              </div>
            </div>
          )}
        </div>

        <div className="filter-group border-b">
          <div
            className="filter-header flex justify-between items-center px-4 py-3 cursor-pointer"
            onClick={() => setShowPriceRanges(!showPriceRanges)}
          >
            <h3 className="font-medium">Khoảng giá</h3>
            {showPriceRanges ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showPriceRanges && (
            <div className="filter-options px-4 pb-3">
              <div
                className={`filter-option mb-1 cursor-pointer ${
                  priceRange === "all" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setPriceRange("all")}
              >
                Tất cả
              </div>
              <div
                className={`filter-option mb-1 cursor-pointer ${
                  priceRange === "under500k" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setPriceRange("under500k")}
              >
                Dưới 500 nghìn
              </div>
              <div
                className={`filter-option mb-1 cursor-pointer ${
                  priceRange === "500k-1m" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setPriceRange("500k-1m")}
              >
                500 nghìn - 1 triệu
              </div>
              <div
                className={`filter-option cursor-pointer ${
                  priceRange === "over1m" ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setPriceRange("over1m")}
              >
                Trên 1 triệu
              </div>
            </div>
          )}
        </div>

        <div className="filter-group border-b">
          <div
            className="filter-header flex justify-between items-center px-4 py-3 cursor-pointer"
            onClick={() => setShowRatings(!showRatings)}
          >
            <h3 className="font-medium">Đánh giá</h3>
            {showRatings ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {showRatings && (
            <div className="filter-options px-4 pb-3">
              <div
                className={`filter-option mb-1 cursor-pointer ${
                  ratingFilter === 0 ? "text-blue-600 font-medium" : ""
                }`}
                onClick={() => setRatingFilter(0)}
              >
                Tất cả
              </div>
              {[5, 4, 3, 2].map((rating) => (
                <div
                  key={rating}
                  className={`filter-option mb-1 cursor-pointer flex items-center ${
                    ratingFilter === rating ? "text-blue-600 font-medium" : ""
                  }`}
                  onClick={() => setRatingFilter(rating)}
                >
                  {Array.from({ length: rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-0.5" />
                  ))}
                  {Array.from({ length: 5 - rating }).map((_, i) => (
                    <FaStar key={i} className="text-gray-300 mr-0.5" />
                  ))}
                  <span className="ml-1">trở lên</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {brands && brands.length > 0 && (
          <div className="filter-group">
            <div
              className="filter-header flex justify-between items-center px-4 py-3 cursor-pointer"
              onClick={() => setShowBrands(!showBrands)}
            >
              <h3 className="font-medium">Thương hiệu</h3>
              {showBrands ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {showBrands && (
              <div className="filter-options px-4 pb-3">
                {brands.map((brand) => (
                  <div
                    key={brand}
                    className="filter-option mb-1 cursor-pointer flex items-center"
                    onClick={() => toggleBrandFilter(brand)}
                  >
                    <input
                      type="checkbox"
                      checked={brandFilters.includes(brand)}
                      onChange={() => {}}
                      className="mr-2"
                    />
                    <span
                      className={
                        brandFilters.includes(brand)
                          ? "text-blue-600 font-medium"
                          : ""
                      }
                    >
                      {brand}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  priceRange: PropTypes.string.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  ratingFilter: PropTypes.number.isRequired,
  setRatingFilter: PropTypes.func.isRequired,
  brandFilters: PropTypes.array.isRequired,
  setBrandFilters: PropTypes.func.isRequired,
  brands: PropTypes.array,
  resetFilters: PropTypes.func.isRequired,
  activeFilters: PropTypes.array.isRequired,
};

export default FilterPanel;
