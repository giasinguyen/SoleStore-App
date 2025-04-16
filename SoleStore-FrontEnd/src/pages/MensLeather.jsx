import { useEffect, useState } from "react";
import '../App.css';
import { productAPI, reviewAPI } from "../services/api";

// Import our reusable components
import { useParams } from "react-router-dom";
import CustomerReviews from "../components/ui/common/CustomerReviews";
import HeroBanner from "../components/ui/common/HeroBanner";
import ProductFilter from "../components/ui/common/ProductFilter";
import ProductGrid from "../components/ui/common/ProductGrid";
import RelatedProducts from "../components/ui/common/RelatedProducts";
const heroImageUrl = "https://cany.vn/image/catalog/banner/cata/giay-tay-banner.png";

const MensLeather = () => {
    const { path } = useParams()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [path]);
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

                // Lấy tất cả sản phẩm từ API
                const productsData = await productAPI.getAllProducts();

                // Lọc ra giày da nam
                const mensLeather = productsData.filter(
                    (product) =>
                        product.gender === "Nam" && product.type === "Tây"
                );

                // Nếu không có sản phẩm giày da nam, sử dụng sản phẩm nam khác
                const productsToUse =
                    mensLeather.length > 0
                        ? mensLeather
                        : productsData.filter((product) => product.gender === "Nam").slice(0, 30);

                // Lấy đánh giá từ API
                try {
                    const reviewsData = await reviewAPI.getAllReviews();

                    // Lọc các đánh giá liên quan đến sản phẩm hiển thị
                    const productIds = productsToUse.map(p => p.id.toString());
                    const relevantReviews = reviewsData.filter(r =>
                        productIds.includes(r.idProduct)
                    ).slice(0, 6);

                    setReviews(relevantReviews);
                } catch (reviewError) {
                    console.error("Error loading reviews:", reviewError);
                    setReviews([]);
                }

                setProducts(productsToUse);
                setFilteredProducts(productsToUse);
                setLoading(false);
            } catch (error) {
                console.error("Error loading data:", error);
                setLoading(false);
                setProducts([]);
                setFilteredProducts([]);
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
                        ? "Mới nhất"
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
                result = result.filter(p => p.price < 1000000);
            } else if (priceRange === "1m-2m") {
                result = result.filter(p => p.price >= 1000000 && p.price <= 2000000);
            } else if (priceRange === "over2m") {
                result = result.filter(p => p.price > 2000000);
            }
        }

        if (activeCategory !== "all") {
            if (activeCategory === "casual") {
                result = result.filter(p =>
                    p.category === "Casual" ||
                    (p.subCategory && p.subCategory === "Casual") ||
                    p.name.toLowerCase().includes("casual")
                );
            } else if (activeCategory === "formal") {
                result = result.filter(p =>
                    p.category === "Formal" ||
                    (p.subCategory && p.subCategory === "Formal") ||
                    p.name.toLowerCase().includes("formal")
                );
            } else if (activeCategory === "beach") {
                result = result.filter(p =>
                    p.category === "Beach" ||
                    (p.subCategory && p.subCategory === "Beach") ||
                    p.name.toLowerCase().includes("beach")
                );
            }
        }

        if (activeTab === "bestseller") {
            result = result.filter((p) => p.isFeatured);
        } else if (activeTab === "new") {
            result = result.filter((p) => p.isNewArrival);
        } else if (activeTab === "sale") {
            result = result.filter((p) => p.discount > 0);
        }

        if (searchQuery.trim() !== "") {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (ratingFilter > 0) {
            result = result.filter((p) => p.rating >= ratingFilter);
        }

        if (brandFilters.length > 0) {
            result = result.filter((p) => {
                return brandFilters.includes(p.brand);
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

    const getBestSellers = () => products.filter((p) => p.isFeatured).slice(0, 4);

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
            logo: "https://images.unsplash.com/photo-1554238113-6d3dbed5cf6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
    ];

    const calculateDiscountPrice = (price, discount) => {
        if (discount === 0) return price;
        const discountAmount = (price * discount) / 100;
        return price - discountAmount;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <HeroBanner
                imageUrl={heroImageUrl}
                title="Giày Da Nam"
                description="Khám phá bộ sưu tập giày da nam cao cấp, kết hợp hoàn hảo giữa phong cách và sự thoải mái"
                buttonText="Khám Phá Ngay"
            />

            <div className="container-custom mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
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

                <div className="fixed bottom-4 right-4 md:hidden z-50">
                    <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                    </button>
                </div>

                <RelatedProducts
                    products={getBestSellers()}
                    title="Bạn Có Thể Thích"
                    calculateDiscountPrice={calculateDiscountPrice}
                />

                <CustomerReviews reviews={reviews} />
            </div>
        </div>
    );
};

export default MensLeather;

