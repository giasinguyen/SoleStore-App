import PropTypes from 'prop-types';
import { FaSearch, FaTimes, FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FilterSectionHeader = ({ title, isOpen, toggle, count }) => (
  <div
    className="flex items-center justify-between cursor-pointer py-2"
    onClick={toggle}
  >
    <h4 className="font-medium text-gray-700">{title}</h4>
    <div className="flex items-center">
      {count !== undefined && (
        <span className="text-sm text-gray-500 mr-2">{count}</span>
      )}
      {isOpen ? (
        <FaChevronUp className="text-gray-400" />
      ) : (
        <FaChevronDown className="text-gray-400" />
      )}
    </div>
  </div>
);

FilterSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  count: PropTypes.number
};

const ProductFilter = ({
  products,
  activeFilters,
  resetFilters,
  searchQuery,
  setSearchQuery,
  showCategories,
  setShowCategories,
  activeTab,
  setActiveTab,
  showShoeTypes,
  setShowShoeTypes,
  activeCategory,
  setActiveCategory,
  showPriceRanges,
  setShowPriceRanges,
  priceRange,
  setPriceRange,
  showRatings,
  setShowRatings,
  ratingFilter,
  setRatingFilter,
  showBrands,
  setShowBrands,
  brands,
  brandFilters,
  toggleBrandFilter
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-bold text-xl mb-5 text-gray-800 flex items-center">
        <span className="bg-blue-100 p-2 rounded-md mr-2 text-blue-600">
          <FaFilter />
        </span>
        Bộ lọc sản phẩm
      </h3>

      {activeFilters.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-700">Bạn đã chọn</h4>
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Xóa tất cả
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {activeFilters.map((filter, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center"
              >
                {filter.label}
                <button
                  onClick={filter.clear}
                  className="ml-1 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="mb-5 border-b border-gray-100 pb-4">
        <FilterSectionHeader
          title="Danh mục"
          isOpen={showCategories}
          toggle={() => setShowCategories(!showCategories)}
        />

        {showCategories && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                activeTab === "all"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              <span className="text-2xl mb-1">🏆</span>
              <span className="text-sm">Tất cả</span>
              <span className="text-xs text-gray-500 mt-1">
                {products.length}
              </span>
            </button>

            <button
              className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                activeTab === "bestseller"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("bestseller")}
            >
              <span className="text-2xl mb-1">🔥</span>
              <span className="text-sm">Bán chạy</span>
              <span className="text-xs text-gray-500 mt-1">
                {products.filter((p) => p.bestSeller).length}
              </span>
            </button>

            <button
              className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                activeTab === "new"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("new")}
            >
              <span className="text-2xl mb-1">✨</span>
              <span className="text-sm">Mới</span>
              <span className="text-xs text-gray-500 mt-1">
                {products.filter((p) => p.isNew).length}
              </span>
            </button>

            <button
              className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                activeTab === "sale"
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("sale")}
            >
              <span className="text-2xl mb-1">🏷️</span>
              <span className="text-sm">Giảm giá</span>
              <span className="text-xs text-gray-500 mt-1">
                {products.filter((p) => p.discount > 0).length}
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="mb-5 border-b border-gray-100 pb-4">
        <FilterSectionHeader
          title="Loại sản phẩm"
          isOpen={showShoeTypes}
          toggle={() => setShowShoeTypes(!showShoeTypes)}
        />

        {showShoeTypes && (
          <div className="mt-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                  activeCategory === "all"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveCategory("all")}
              >
                <span className="text-xl mb-1">👟</span>
                <span className="text-sm">Tất cả</span>
              </button>

              <button
                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                  activeCategory === "stiletto" || activeCategory === "running" || activeCategory === "casual"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveCategory(activeCategory === "stiletto" || activeCategory === "running" || activeCategory === "casual" 
                  ? "all" 
                  : activeCategory === "all" ? "stiletto" || "running" || "casual" : activeCategory)}
              >
                <span className="text-xl mb-1">👠</span>
                <span className="text-sm">Kiểu 1</span>
              </button>

              <button
                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                  activeCategory === "block" || activeCategory === "basketball" || activeCategory === "formal"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveCategory(activeCategory === "block" || activeCategory === "basketball" || activeCategory === "formal" 
                  ? "all" 
                  : activeCategory === "all" ? "block" || "basketball" || "formal" : activeCategory)}
              >
                <span className="text-xl mb-1">👞</span>
                <span className="text-sm">Kiểu 2</span>
              </button>

              <button
                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${
                  activeCategory === "kitten" || activeCategory === "training" || activeCategory === "beach"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveCategory(activeCategory === "kitten" || activeCategory === "training" || activeCategory === "beach" 
                  ? "all" 
                  : activeCategory === "all" ? "kitten" || "training" || "beach" : activeCategory)}
              >
                <span className="text-xl mb-1">👡</span>
                <span className="text-sm">Kiểu 3</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mb-5 border-b border-gray-100 pb-4">
        <FilterSectionHeader
          title="Khoảng giá"
          isOpen={showPriceRanges}
          toggle={() => setShowPriceRanges(!showPriceRanges)}
        />

        {showPriceRanges && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              <button
                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${
                  priceRange === "all"
                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
                onClick={() => setPriceRange("all")}
              >
                Tất cả
              </button>

              <button
                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${
                  priceRange === "under500k" || priceRange === "under1m"
                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
                onClick={() => setPriceRange(priceRange === "under500k" || priceRange === "under1m" ? "all" : "under500k" || "under1m")}
              >
                &lt; Mức 1
              </button>

              <button
                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${
                  priceRange === "500k-1m" || priceRange === "1m-2m"
                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
                onClick={() => setPriceRange(priceRange === "500k-1m" || priceRange === "1m-2m" ? "all" : "500k-1m" || "1m-2m")}
              >
                Khoảng giữa
              </button>

              <button
                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${
                  priceRange === "over1m" || priceRange === "over2m"
                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                }`}
                onClick={() => setPriceRange(priceRange === "over1m" || priceRange === "over2m" ? "all" : "over1m" || "over2m")}
              >
                &gt; Mức 2
              </button>
            </div>

            <div className="mt-4 px-2">
              <div className="h-2 bg-gray-200 rounded-full relative">
                <div
                  className={`absolute h-full bg-blue-500 rounded-full ${
                    priceRange === "under500k" || priceRange === "under1m"
                      ? "w-1/3"
                      : priceRange === "500k-1m" || priceRange === "1m-2m"
                        ? "left-1/3 w-1/3"
                        : priceRange === "over1m" || priceRange === "over2m"
                          ? "left-2/3 w-1/3"
                          : "w-full opacity-30"
                  }`}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Min</span>
                <span>Trung bình</span>
                <span>Max</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-5 border-b border-gray-100 pb-4">
        <FilterSectionHeader
          title="Đánh giá"
          isOpen={showRatings}
          toggle={() => setShowRatings(!showRatings)}
        />

        {showRatings && (
          <div className="mt-3 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                className={`flex items-center w-full text-left rounded-lg p-3 transition ${
                  ratingFilter === star
                    ? "bg-blue-50 text-blue-700 border-2 border-blue-200"
                    : "hover:bg-gray-50 text-gray-700 border border-gray-200"
                }`}
                onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={
                        i < star ? "text-yellow-400" : "text-gray-300"
                      }
                      fill="currentColor"
                      height="18"
                      width="18"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2">trở lên</span>
                <span className="ml-auto text-sm text-gray-500">
                  (
                  {
                    products.filter((p) => parseFloat(p.rating) >= star)
                      .length
                  }
                  )
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-5">
        <FilterSectionHeader
          title="Thương hiệu"
          isOpen={showBrands}
          toggle={() => setShowBrands(!showBrands)}
        />

        {showBrands && (
          <div className="mt-3">
            <div className="grid grid-cols-2 gap-3">
              {brands.map((brand, index) => (
                <button
                  key={index}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition ${
                    brandFilters.includes(brand.name)
                      ? "bg-blue-50 border-2 border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                  }`}
                  onClick={() => toggleBrandFilter(brand.name)}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden mb-2 bg-white p-1">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span
                    className={`text-sm ${
                      brandFilters.includes(brand.name)
                        ? "font-medium text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {brand.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center justify-center font-medium"
        onClick={resetFilters}
      >
        <FaTimes className="mr-2" />
        Xóa tất cả bộ lọc
      </button>
    </div>
  );
};

ProductFilter.propTypes = {
  products: PropTypes.array.isRequired,
  activeFilters: PropTypes.array.isRequired,
  resetFilters: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  showCategories: PropTypes.bool.isRequired,
  setShowCategories: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  showShoeTypes: PropTypes.bool.isRequired,
  setShowShoeTypes: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  showPriceRanges: PropTypes.bool.isRequired,
  setShowPriceRanges: PropTypes.func.isRequired,
  priceRange: PropTypes.string.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  showRatings: PropTypes.bool.isRequired,
  setShowRatings: PropTypes.func.isRequired,
  ratingFilter: PropTypes.number.isRequired,
  setRatingFilter: PropTypes.func.isRequired,
  showBrands: PropTypes.bool.isRequired,
  setShowBrands: PropTypes.func.isRequired,
  brands: PropTypes.array.isRequired,
  brandFilters: PropTypes.array.isRequired,
  toggleBrandFilter: PropTypes.func.isRequired
};

export default ProductFilter;