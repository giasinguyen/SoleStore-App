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

const heroImageUrl = "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80";

const WomensHeels = () => {
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

                const womenHeels = productsData.filter(
                    (product) =>
                        product.gender === "Nữ" &&
                        ((product.category &&
                            product.category.toLowerCase().includes("heel")) ||
                            (product.type && product.type.toLowerCase().includes("heel")) ||
                            (product.tags &&
                                Array.isArray(product.tags) &&
                                product.tags.some(
                                    (tag) =>
                                        typeof tag === "string" &&
                                        tag.toLowerCase().includes("heel")
                                )))
                );

                const productsToUse =
                    womenHeels.length > 0
                        ? womenHeels
                        : productsData
                            .filter((product) => product.gender === "Nữ")
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
                            name: "Nguyễn Thị Hương",
                            location: "Hà Nội",
                            image:
                                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                            rating: 5,
                            text: "Tôi đã mua đôi giày cao gót từ cửa hàng này và rất hài lòng. Thiết kế đẹp mắt, thoải mái khi đi và đặc biệt phù hợp với nhiều trang phục khác nhau.",
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
                        product.type ||
                        ["stiletto", "block", "kitten"][Math.floor(Math.random() * 3)],
                    discount:
                        product.discount ||
                        (Math.random() > 0.8 ? Math.floor(Math.random() * 20 + 10) : 0),
                    rating: product.rating || (Math.random() * 2 + 3).toFixed(1),
                    name: product.name.includes("Heel")
                        ? product.name
                        : product.name
                            .replace("Running", "Stiletto")
                            .replace("Shoe", "Heel"),
                }));

                setProducts(enhancedData);
                setFilteredProducts(enhancedData);
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);

                const fallbackProducts = [
                    {
                        id: 1,
                        name: "Steve Madden Vala",
                        price: "1.890.000đ",
                        image:
                            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
                        rating: "4.5",
                        category: "stiletto",
                        isNew: true,
                        discount: 0,
                        bestSeller: true,
                        color: "Đen",
                    },
                ];

                const fallbackReviews = [
                    {
                        name: "Nguyễn Thị Hương",
                        location: "Hà Nội",
                        image:
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
                        rating: 5,
                        text: "Tôi đã mua đôi giày cao gót từ cửa hàng này và rất hài lòng. Thiết kế đẹp mắt, thoải mái khi đi và đặc biệt phù hợp với nhiều trang phục khác nhau.",
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
                    ? "Bán chạy"
                    : activeTab === "new"
                        ? "Mới"
                        : "Giảm giá",
            clear: () => setActiveTab("all"),
        });
    }
    if (activeCategory !== "all") {
        activeFilters.push({
            label:
                activeCategory === "stiletto"
                    ? "Stiletto"
                    : activeCategory === "block"
                        ? "Gót vuông"
                        : "Gót thấp",
            clear: () => setActiveCategory("all"),
        });
    }
    if (priceRange !== "all") {
        activeFilters.push({
            label:
                priceRange === "under1m"
                    ? "< 1 triệu"
                    : priceRange === "1m-2m"
                        ? "1-2 triệu"
                        : "> 2 triệu",
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
            if (priceRange === "under1m") {
                result = result.filter(
                    (p) => parseInt(p.price.replace(/\D/g, "")) < 1000000
                );
            } else if (priceRange === "1m-2m") {
                result = result.filter((p) => {
                    const price = parseInt(p.price.replace(/\D/g, ""));
                    return price >= 1000000 && price <= 2000000;
                });
            } else if (priceRange === "over2m") {
                result = result.filter(
                    (p) => parseInt(p.price.replace(/\D/g, "")) > 2000000
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

    const getStilettoHeels = () =>
        products.filter((p) => p.category === "stiletto").slice(0, 4);
    const getBlockHeels = () =>
        products.filter((p) => p.category === "block").slice(0, 4);
    const getKittenHeels = () =>
        products.filter((p) => p.category === "kitten").slice(0, 4);
    const getNewestArrivals = () => products.filter((p) => p.isNew).slice(0, 4);
    const getBestSellers = () => products.filter((p) => p.bestSeller).slice(0, 4);
    const getDiscountedProducts = () =>
        products
            .filter((p) => p.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 4);

    const brands = [
        {
            name: "Christian Louboutin",
            logo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Jimmy Choo",
            logo: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Manolo Blahnik",
            logo: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Steve Madden",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mZKV3IQcBSzFkNB9FYf5F4RM4yeNHxaEyRMsy9J7kpNyqp492IM6FTvkgIrD8PdBd90&usqp=CAU",
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
                title="Giày Cao Gót Nữ"
                description="Khám phá bộ sưu tập giày cao gót nữ cao cấp, tôn dáng và tạo nên vẻ sang trọng cho mọi bước chân"
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

export default WomensHeels;
