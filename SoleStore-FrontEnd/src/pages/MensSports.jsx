import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
    FaChevronDown,
    FaChevronRight,
    FaChevronUp,
    FaFilter,
    FaRegThumbsUp,
    FaSearch,
    FaShoppingCart,
    FaStar,
    FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import productsData from "../Data/products.json";
import "./styles/WomensSports.css";

const heroImageUrl =
    "https://file.hstatic.net/200000174405/collection/19238246_1997064527179566_5473797071884482645_o_ff15685be80c4d21973dcb914398e04f.jpg";

const MansSports = () => {
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [priceRange, setPriceRange] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [activeTab, setActiveTab] = useState("all");
    const [ratingFilter, setRatingFilter] = useState(0);
    const [brandFilters, setBrandFilters] = useState([]);

    const [showCategories, setShowCategories] = useState(true);
    const [showShoeTypes, setShowShoeTypes] = useState(true);
    const [showPriceRanges, setShowPriceRanges] = useState(true);
    const [showRatings, setShowRatings] = useState(true);
    const [showBrands, setShowBrands] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const womenSandals = productsData.filter(product =>
                    product.gender === "Nam" && (
                        (product.category && product.category.toLowerCase().includes("thể")) ||
                        (product.type && product.type.toLowerCase().includes("thể")) ||
                        (product.tags && Array.isArray(product.tags) &&
                            product.tags.some(tag => typeof tag === "string" && tag.toLowerCase().includes("thể")))
                    )
                );

                const productsToUse = womenSandals.length > 0 ? womenSandals :
                    productsData.filter(product => product.gender === "Nam").slice(0, 30);

                try {
                    const reviewResponse = await axios.get(
                        "https://67dbd6fd1fd9e43fe476247e.mockapi.io/reviews"
                    );
                    const reviewData = reviewResponse.data;

                    let reviewsToUse = Array.isArray(reviewData)
                        ? reviewData
                        : reviewData.reviews || reviewData.items || [];

                    setReviews(reviewsToUse.slice(0, 3));
                } catch (reviewError) {
                    console.error("Error loading reviews:", reviewError);
                    setReviews([
                        {
                            name: "Nguyễn Thị Hương",
                            location: "Hà Nội",
                            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                            rating: 5,
                            text: "Tôi đã mua đôi dép xăng đan từ cửa hàng này và rất hài lòng. Thiết kế đẹp mắt, thoải mái khi đi và đặc biệt phù hợp với thời tiết mùa hè.",
                        },
                    ]);
                }

                const enhancedData = productsToUse.map(product => ({
                    ...product,
                    price: typeof product.price === "number"
                        ? `${product.price.toLocaleString("vi-VN")}đ`
                        : product.price,
                    image: product.images && product.images.length > 0
                        ? product.images[0]
                        : product.image || "https://via.placeholder.com/400x500?text=No+Image",
                    isNew: product.isNewArrival || product.isNew || false,
                    bestSeller: product.isFeatured || product.bestSeller || false,
                    color: product.colors && product.colors.length > 0
                        ? product.colors[0]
                        : product.color || "Đen",
                    category: product.subCategory || ["casual", "formal", "beach"][Math.floor(Math.random() * 3)],
                    discount: product.discount || (Math.random() > 0.8 ? Math.floor(Math.random() * 20 + 10) : 0),
                    rating: product.rating || (Math.random() * 2 + 3).toFixed(1),
                    name: product.name.includes("Sandal")
                        ? product.name
                        : product.name.replace("Running", "Sandal").replace("Shoe", "Sandal"),
                }));

                setProducts(enhancedData);
                setFilteredProducts(enhancedData);
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);

                const fallbackProducts = [
                    {
                        id: 1,
                        name: "Havaianas Slim Sandal",
                        price: "590.000đ",
                        image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
                        rating: "4.5",
                        category: "beach",
                        isNew: true,
                        discount: 0,
                        bestSeller: true,
                        color: "Đen",
                    },
                ];

                setProducts(fallbackProducts);
                setFilteredProducts(fallbackProducts);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const toggleBrandFilter = (brandName) => {
        if (brandFilters.includes(brandName)) {
            setBrandFilters(brandFilters.filter((brand) => brand !== brandName));
        } else {
            setBrandFilters([...brandFilters, brandName]);
        }
    };

    const resetFilters = () => {
        setSearchQuery("");
        setPriceRange("all");
        setActiveCategory("all");
        setActiveTab("all");
        setRatingFilter(0);
        setBrandFilters([]);
    };

    const activeFilters = [];
    if (activeTab !== "all") {
        activeFilters.push({
            label:
                activeTab === "bestseller"
                    ? "Bán chạy nhất"
                    : activeTab === "new"
                        ? "Sản phẩm mới"
                        : "Giảm giá",
            clear: () => setActiveTab("all"),
        });
    }
    if (activeCategory !== "all") {
        activeFilters.push({
            label:
                activeCategory === "casual"
                    ? "Dạo phố"
                    : activeCategory === "formal"
                        ? "Lịch sự"
                        : "Bãi biển",
            clear: () => setActiveCategory("all"),
        });
    }
    if (priceRange !== "all") {
        activeFilters.push({
            label:
                priceRange === "under500k"
                    ? "< 500 nghìn"
                    : priceRange === "500k-1m"
                        ? "500 nghìn - 1 triệu"
                        : "> 1 triệu",
            clear: () => setPriceRange("all"),
        });
    }
    if (ratingFilter > 0) {
        activeFilters.push({
            label: `${ratingFilter}★ trở lên`,
            clear: () => setRatingFilter(0),
        });
    }

    brandFilters.forEach((brand) => {
        activeFilters.push({
            label: brand,
            clear: () => toggleBrandFilter(brand),
        });
    });

    useEffect(() => {
        let result = [...products];

        if (priceRange !== "all") {
            if (priceRange === "under500k") {
                result = result.filter(
                    (p) => parseInt(p.price.replace(/\D/g, "")) < 500000
                );
            } else if (priceRange === "500k-1m") {
                result = result.filter((p) => {
                    const price = parseInt(p.price.replace(/\D/g, ""));
                    return price >= 500000 && price <= 1000000;
                });
            } else if (priceRange === "over1m") {
                result = result.filter(
                    (p) => parseInt(p.price.replace(/\D/g, "")) > 1000000
                );
            }
        }

        if (activeCategory !== "all") {
            result = result.filter((p) => p.category === activeCategory);
        }

        if (activeTab === "bestseller") {
            result = result.filter((p) => p.bestSeller);
        } else if (activeTab === "new") {
            result = result.filter((p) => p.isNew);
        } else if (activeTab === "sale") {
            result = result.filter((p) => p.discount > 0);
        }

        if (searchQuery.trim() !== "") {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (ratingFilter > 0) {
            result = result.filter((p) => parseFloat(p.rating) >= ratingFilter);
        }

        if (brandFilters.length > 0) {
            result = result.filter((p) => {
                return brandFilters.some((brand) =>
                    p.name.toLowerCase().includes(brand.toLowerCase())
                );
            });
        }

        setFilteredProducts(result);
    }, [
        priceRange,
        searchQuery,
        activeCategory,
        activeTab,
        products,
        ratingFilter,
        brandFilters,
    ]);

    // const getCasualSandals = () =>
    //   products.filter((p) => p.category === "casual").slice(0, 4);
    // const getFormalSandals = () =>
    //   products.filter((p) => p.category === "formal").slice(0, 4);
    // const getBeachSandals = () =>
    //   products.filter((p) => p.category === "beach").slice(0, 4);
    // const getNewestArrivals = () => products.filter((p) => p.isNew).slice(0, 4);
    // const getBestSellers = () => products.filter((p) => p.bestSeller).slice(0, 4);
    // const getDiscountedProducts = () =>
    //   products
    //     .filter((p) => p.discount > 0)
    //     .sort((a, b) => b.discount - a.discount)
    //     .slice(0, 4);

    const brands = [
        {
            name: "Havaianas",
            logo: "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Birkenstock",
            logo: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Teva",
            logo: "https://images.unsplash.com/photo-1531911617563-5faaf4a478df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Ipanema",
            logo: "https://images.unsplash.com/photo-1612015709104-c7f8cafbdeed?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
    ];

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

    const renderProductCard = (product) => (
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
                    src={product.image}
                    className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={product.name}
                />

                {/* <div className="overlay absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex justify-center space-x-3">
                    <button className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-pink-100">
                        <FaHeart className="text-pink-500" />
                    </button>
                    <button className="bg-blue-600 text-white rounded-full px-4 hover:bg-blue-700 flex-grow flex items-center justify-center">
                        <FaShoppingCart className="mr-1" /> Thêm vào giỏ
                    </button>
                </div> */}
            </div>

            <div className="text-center p-4">
                <div className="text-sm text-gray-500 mb-1 capitalize">
                    {product.category === "casual"
                        ? "Dạo phố"
                        : product.category === "formal"
                            ? "Lịch sự"
                            : "Bãi biển"}
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

                <Button as={Link} to={`/product/${product.id}`} className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors">
                    <FaShoppingCart />
                </Button>
            </div>
        </div>
    );
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

    return (
        <div className="bg-gray-50">
            <div className="relative">
                <div className="w-full h-[400px] md:h-[500px] overflow-hidden">
                    <img
                        src={heroImageUrl}
                        alt="Men's Sport Collection"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent flex items-center">
                        <div className="text-white p-6 md:p-16 max-w-2xl">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                                Giày thể thao nam
                            </h1>
                            <p className="text-lg md:text-xl mb-6 opacity-90">
                                Khám phá bộ sưu tập giày thể thao Nam cao cấp, kết hợp hoàn hảo
                                giữa sự thoải mái và thời trang
                            </p>
                            <button className="bg-white text-gray-800 font-semibold px-6 py-2 rounded hover:bg-gray-200 transition-colors">
                                Khám Phá Ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 hidden md:block">
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
                                            className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "all"
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
                                            className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "bestseller"
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
                                            className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "new"
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
                                            className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeTab === "sale"
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
                                    title="Loại dép"
                                    isOpen={showShoeTypes}
                                    toggle={() => setShowShoeTypes(!showShoeTypes)}
                                />

                                {showShoeTypes && (
                                    <div className="mt-3 space-y-2">
                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "all"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                    }`}
                                                onClick={() => setActiveCategory("all")}
                                            >
                                                <span className="text-xl mb-1">👡</span>
                                                <span className="text-sm">Tất cả</span>
                                            </button>

                                            <button
                                                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "casual"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                    }`}
                                                onClick={() => setActiveCategory("casual")}
                                            >
                                                <span className="text-xl mb-1">👟</span>
                                                <span className="text-sm">Dạo phố</span>
                                            </button>

                                            <button
                                                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "formal"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                    }`}
                                                onClick={() => setActiveCategory("formal")}
                                            >
                                                <span className="text-xl mb-1">👠</span>
                                                <span className="text-sm">Lịch sự</span>
                                            </button>

                                            <button
                                                className={`filter-button flex flex-col items-center justify-center p-3 rounded-lg transition ${activeCategory === "beach"
                                                    ? "bg-blue-50 text-blue-700 font-medium"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                    }`}
                                                onClick={() => setActiveCategory("beach")}
                                            >
                                                <span className="text-xl mb-1">🏖️</span>
                                                <span className="text-sm">Bãi biển</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cải tiến bộ lọc giá - layout rộng hơn */}
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
                                                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "all"
                                                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                                                    }`}
                                                onClick={() => setPriceRange("all")}
                                            >
                                                Tất cả
                                            </button>

                                            <button
                                                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "under500k"
                                                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                                                    }`}
                                                onClick={() => setPriceRange("under500k")}
                                            >
                                                &lt; 500k
                                            </button>

                                            <button
                                                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "500k-1m"
                                                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                                                    }`}
                                                onClick={() => setPriceRange("500k-1m")}
                                            >
                                                500k - 1tr
                                            </button>

                                            <button
                                                className={`filter-button py-2 px-4 rounded-lg transition flex-grow text-center ${priceRange === "over1m"
                                                    ? "bg-blue-50 text-blue-700 font-medium border-2 border-blue-200"
                                                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200"
                                                    }`}
                                                onClick={() => setPriceRange("over1m")}
                                            >
                                                &gt; 1 triệu
                                            </button>
                                        </div>

                                        {/* Thanh hiển thị khoảng giá trực quan */}
                                        <div className="mt-4 px-2">
                                            <div className="h-2 bg-gray-200 rounded-full relative">
                                                <div
                                                    className={`absolute h-full bg-blue-500 rounded-full ${priceRange === "under500k"
                                                        ? "w-1/3"
                                                        : priceRange === "500k-1m"
                                                            ? "left-1/3 w-1/3"
                                                            : priceRange === "over1m"
                                                                ? "left-2/3 w-1/3"
                                                                : "w-full opacity-30"
                                                        }`}
                                                ></div>
                                            </div>
                                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                                                <span>0đ</span>
                                                <span>500k</span>
                                                <span>1tr</span>
                                                <span>2tr+</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Cải tiến bộ lọc đánh giá - giao diện trực quan hơn */}
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
                                                className={`flex items-center w-full text-left rounded-lg p-3 transition ${ratingFilter === star
                                                    ? "bg-blue-50 text-blue-700 border-2 border-blue-200"
                                                    : "hover:bg-gray-50 text-gray-700 border border-gray-200"
                                                    }`}
                                                onClick={() =>
                                                    setRatingFilter(ratingFilter === star ? 0 : star)
                                                }
                                            >
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <FaStar
                                                            key={i}
                                                            className={
                                                                i < star ? "text-yellow-400" : "text-gray-300"
                                                            }
                                                            size={18}
                                                        />
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

                            {/* Cải tiến bộ lọc thương hiệu - hiển thị logo */}
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
                                                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition ${brandFilters.includes(brand.name)
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
                                                        className={`text-sm ${brandFilters.includes(brand.name)
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

                            {/* Nút reset rõ ràng hơn */}
                            <button
                                className="w-full py-3 px-4 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center justify-center font-medium"
                                onClick={resetFilters}
                            >
                                <FaTimes className="mr-2" />
                                Xóa tất cả bộ lọc
                            </button>
                        </div>
                    </div>

                    {/* Main content with products */}
                    <div className="md:w-2/3">
                        {/* Search and filters bar */}
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <span className="text-gray-700 font-medium">
                                    Hiển thị {filteredProducts.length} sản phẩm
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <select className="border border-gray-300 rounded-lg pl-3 pr-8 py-2 bg-white focus:outline-none focus:border-blue-500">
                                    <option value="featured">Nổi bật</option>
                                    <option value="newest">Mới nhất</option>
                                    <option value="price-asc">Giá: Thấp đến Cao</option>
                                    <option value="price-desc">Giá: Cao đến Thấp</option>
                                    <option value="rating">Đánh giá cao nhất</option>
                                </select>

                                <div className="relative hidden md:block">
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-60 focus:outline-none focus:border-blue-500"
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
                        </div>

                        {/* Quick filter tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() => setActiveTab("all")}
                            >
                                Tất cả
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "bestseller"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() => setActiveTab("bestseller")}
                            >
                                Bán chạy
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "new"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() => setActiveTab("new")}
                            >
                                Mới
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "sale"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() => setActiveTab("sale")}
                            >
                                Giảm giá
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "casual"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === "casual" ? "all" : "casual"
                                    )
                                }
                            >
                                Dạo phố
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "formal"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === "formal" ? "all" : "formal"
                                    )
                                }
                            >
                                Lịch sự
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === "beach"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory === "beach" ? "all" : "beach"
                                    )
                                }
                            >
                                Bãi biển
                            </button>
                        </div>

                        {/* Product Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                                <div className="text-7xl mb-4">🔍</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    Không tìm thấy sản phẩm nào
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Không có sản phẩm nào phù hợp với bộ lọc đã chọn. Hãy thử điều
                                    chỉnh bộ lọc của bạn.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                >
                                    Xóa bộ lọc
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <div key={product.id} className="h-full">
                                        {renderProductCard(product)}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex items-center space-x-1">
                                    <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                                        Trước
                                    </button>
                                    <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">
                                        1
                                    </button>
                                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                                        2
                                    </button>
                                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                                        3
                                    </button>
                                    <span className="px-3 py-2">...</span>
                                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                                        10
                                    </button>
                                    <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                                        Sau
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Customer Reviews Section */}
            <div className="container mx-auto px-4 py-12 bg-white my-6 rounded-lg shadow-sm">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Đánh Giá Từ Khách Hàng
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Khám phá những đánh giá chân thực từ khách hàng của chúng tôi về các
                        sản phẩm dép xăng đan Nam
                    </p>
                </div>

                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={review.image || "https://via.placeholder.com/40"}
                                        alt={review.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-800">{review.name}</h4>
                                        <p className="text-gray-600 text-sm">{review.location}</p>
                                    </div>
                                </div>

                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={
                                                i < review.rating ? "text-yellow-400" : "text-gray-300"
                                            }
                                            size={16}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">
                                        {new Date().toLocaleDateString("vi-VN", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>

                                <p className="text-gray-700 mb-4">{review.text}</p>

                                <div className="flex items-center mt-4 text-gray-500 text-sm">
                                    <button className="flex items-center hover:text-blue-600">
                                        <FaRegThumbsUp className="mr-1" size={14} />
                                        <span>Hữu ích (15)</span>
                                    </button>
                                    <span className="mx-2">•</span>
                                    <button className="hover:text-blue-600">Báo cáo</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <div className="text-5xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Chưa có đánh giá
                        </h3>
                        <p className="text-gray-600">
                            Hãy là người đầu tiên đánh giá về sản phẩm của chúng tôi!
                        </p>
                    </div>
                )}

                <div className="text-center mt-10">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium inline-flex items-center transition-colors">
                        Xem tất cả đánh giá <FaChevronRight className="ml-2" size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MansSports;

