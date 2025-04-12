import { useEffect, useState } from "react";
import axios from "axios";

import productsData from "../Data/products.json";
import "./styles/WomensHeels.css";

// Import our reusable components
import HeroBanner from "../components/ui/common/HeroBanner";
import ProductFilter from "../components/ui/common/ProductFilter";
import ProductGrid from "../components/ui/common/ProductGrid";
import CustomerReviews from "../components/ui/common/CustomerReviews";
import RelatedProducts from "../components/ui/common/RelatedProducts";

const heroImageUrl = "https://nguonhangchina.com/wp-content/uploads/2024/02/Noi-dung-doan-van-ban-cua-ban-2024-02-28T161827.709-1170x440.jpg";

const MensSandals = () => {
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

    // State for collapsible sections
    const [showCategories, setShowCategories] = useState(true);
    const [showShoeTypes, setShowShoeTypes] = useState(true);
    const [showPriceRanges, setShowPriceRanges] = useState(true);
    const [showRatings, setShowRatings] = useState(true);
    const [showBrands, setShowBrands] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const mensSandals = productsData.filter(
                    (product) =>
                        product.gender === "Nam" &&
                        ((product.category &&
                            product.category.toLowerCase().includes("sandal")) ||
                            (product.type && product.type.toLowerCase().includes("sandal")) ||
                            (product.tags &&
                                Array.isArray(product.tags) &&
                                product.tags.some(
                                    (tag) =>
                                        typeof tag === "string" &&
                                        tag.toLowerCase().includes("sandal")
                                )))
                );

                const productsToUse =
                    mensSandals.length > 0
                        ? mensSandals
                        : productsData
                            .filter((product) => product.gender === "Nam")
                            .slice(0, 30);

                try {
                    const reviewResponse = await axios.get(
                        "https://67dbd6fd1fd9e43fe476247e.mockapi.io/reviews"
                    );
                    const reviewData = reviewResponse.data;

                    let reviewsToUse = Array.isArray(reviewData)
                        ? reviewData
                        : reviewData.reviews || reviewData.items || [];

                    setReviews(reviewsToUse.slice(0, 6));
                } catch (reviewError) {
                    console.error("Error loading reviews:", reviewError);
                    setReviews([
                        {
                            name: "Nguyễn Văn Minh",
                            location: "Hà Nội",
                            image:
                                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                            rating: 5,
                            text: "Tôi đã mua đôi dép sandal từ cửa hàng này và rất hài lòng. Thiết kế đẹp mắt, thoải mái khi đi và đặc biệt phù hợp với thời tiết mùa hè.",
                        },
                    ]);
                }

                const enhancedData = productsToUse.map((product) => ({
                    ...product,
                    price:
                        typeof product.price === "number"
                            ? `${product.price.toLocaleString("vi-VN")}đ`
                            : product.price,
                    image:
                        product.images && product.images.length > 0
                            ? product.images[0]
                            : product.image ||
                            "https://via.placeholder.com/400x500?text=No+Image",
                    isNew: product.isNewArrival || product.isNew || false,
                    bestSeller: product.isFeatured || product.bestSeller || false,
                    color:
                        product.colors && product.colors.length > 0
                            ? product.colors[0]
                            : product.color || "Đen",
                    category:
                        product.subCategory ||
                        ["casual", "formal", "beach"][Math.floor(Math.random() * 3)],
                    discount:
                        product.discount ||
                        (Math.random() > 0.8 ? Math.floor(Math.random() * 20 + 10) : 0),
                    rating: product.rating || (Math.random() * 2 + 3).toFixed(1),
                }));

                setProducts(enhancedData);
                setFilteredProducts(enhancedData);
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);

                const fallbackProducts = [
                    {
                        id: 1,
                        name: "Birkenstock Arizona",
                        price: "1.290.000đ",
                        image:
                            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
                        rating: "4.5",
                        category: "casual",
                        isNew: true,
                        discount: 0,
                        bestSeller: true,
                        color: "Nâu",
                    },
                ];

                const fallbackReviews = [
                    {
                        name: "Nguyễn Văn Minh",
                        location: "Hà Nội",
                        image:
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                        rating: 5,
                        text: "Tôi đã mua đôi dép sandal từ cửa hàng này và rất hài lòng. Thiết kế đẹp mắt, thoải mái khi đi và đặc biệt phù hợp với thời tiết mùa hè.",
                    },
                ];

                setProducts(fallbackProducts);
                setFilteredProducts(fallbackProducts);
                setReviews(fallbackReviews);
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

    // Prepare active filters
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

    const getBestSellers = () => products.filter((p) => p.bestSeller).slice(0, 4);

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
            logo: "https://www.sockshopandshoeco.com/cdn/shop/collections/teva-logo.jpg?v=1594674545",
        },
        {
            name: "Ipanema",
            logo: "https://assets.brazilianfootwear.com/brands/thumbs/md/7ffdaddc86096aebff7692c78bc6171c.jpg",
        },
    ];

    const getNumericPrice = (priceStr) => {
        if (typeof priceStr === "number") {
            return priceStr;
        }
        return parseInt(String(priceStr).replace(/\D/g, "")) || 0;
    };

    const calculateDiscountPrice = (price, discount) => {
        if (discount === 0) return price;
        const numericPrice = getNumericPrice(price);
        const discountAmount = numericPrice * (discount / 100);
        const finalPrice = numericPrice - discountAmount;
        return finalPrice.toLocaleString("vi-VN") + "đ";
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Banner */}
            <HeroBanner 
                imageUrl={heroImageUrl}
                title="Dép Sandal Nam"
                description="Khám phá bộ sưu tập dép sandal nam cao cấp, kết hợp hoàn hảo giữa sự thoải mái và thời trang"
                buttonText="Khám Phá Ngay"
            />

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Filter Sidebar */}
                    <div className="md:w-1/3 hidden md:block">
                        <ProductFilter 
                            products={products}
                            activeFilters={activeFilters}
                            resetFilters={resetFilters}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            showCategories={showCategories}
                            setShowCategories={setShowCategories}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            showShoeTypes={showShoeTypes}
                            setShowShoeTypes={setShowShoeTypes}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                            showPriceRanges={showPriceRanges}
                            setShowPriceRanges={setShowPriceRanges}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            showRatings={showRatings}
                            setShowRatings={setShowRatings}
                            ratingFilter={ratingFilter}
                            setRatingFilter={setRatingFilter}
                            showBrands={showBrands}
                            setShowBrands={setShowBrands}
                            brands={brands}
                            brandFilters={brandFilters}
                            toggleBrandFilter={toggleBrandFilter}
                        />
                    </div>

                    {/* Product Grid */}
                    <div className="md:w-2/3">
                        <ProductGrid 
                            products={filteredProducts}
                            loading={loading}
                            calculateDiscountPrice={calculateDiscountPrice}
                            resetFilters={resetFilters}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            activeCategory={activeCategory}
                            setActiveCategory={setActiveCategory}
                        />
                    </div>
                </div>

                {/* Mobile filter overlay */}
                <div className="fixed inset-0 filter-overlay z-50 transform translate-x-full transition-transform duration-300">
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={() =>
                            document
                                .querySelector(".filter-overlay")
                                .classList.remove("active")
                        }
                    ></div>
                    <div className="absolute right-0 top-0 bottom-0 w-4/5 max-w-md bg-white p-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">Lọc sản phẩm</h3>
                            <button
                                onClick={() =>
                                    document
                                        .querySelector(".filter-overlay")
                                        .classList.remove("active")
                                }
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                {/* FaTimes icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile filters content */}
                        {/* ... */}
                    </div>
                </div>

                {/* Related Products Section */}
                <RelatedProducts 
                    products={getBestSellers()} 
                    title="Bạn Có Thể Thích" 
                    calculateDiscountPrice={calculateDiscountPrice} 
                />

                {/* Customer Reviews Section */}
                <CustomerReviews reviews={reviews} />
            </div>
        </div>
    );
};

export default MensSandals;
