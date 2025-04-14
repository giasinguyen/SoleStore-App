import { useEffect, useState } from "react";
import { productAPI, reviewAPI } from "../services/api";
import '../App.css'; 

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

                // Lấy tất cả sản phẩm từ API
                const productsData = await productAPI.getAllProducts();
                
                // Lọc ra giày cao gót nữ
                // Các sản phẩm cao gót thường có category là "Heels" hoặc bất kỳ danh mục nào chứa từ "heel"
                const womensHeels = productsData.filter(
                    (product) =>
                        product.gender === "Nữ" && product.category === "Giày cao gót" 
                );

                // Nếu không có sản phẩm giày cao gót nữ, sử dụng sản phẩm nữ khác
                const productsToUse =
                    womensHeels.length > 0
                        ? womensHeels
                        : productsData.filter((product) => product.gender === "Nữ").slice(0, 30);
                
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
                result = result.filter(p => p.price < 1000000);
            } else if (priceRange === "1m-2m") {
                result = result.filter(p => p.price >= 1000000 && p.price <= 2000000);
            } else if (priceRange === "over2m") {
                result = result.filter(p => p.price > 2000000);
            }
        }

        if (activeCategory !== "all") {
            if (activeCategory === "stiletto") {
                result = result.filter(p => 
                    p.category === "Stiletto" || 
                    (p.subCategory && p.subCategory === "Stiletto") || 
                    p.name.toLowerCase().includes("stiletto")
                );
            } else if (activeCategory === "block") {
                result = result.filter(p => 
                    p.category === "Block" || 
                    (p.subCategory && p.subCategory === "Block") || 
                    p.name.toLowerCase().includes("block")
                );
            } else if (activeCategory === "kitten") {
                result = result.filter(p => 
                    p.category === "Kitten" || 
                    (p.subCategory && p.subCategory === "Kitten") || 
                    p.name.toLowerCase().includes("kitten")
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

    // eslint-disable-next-line no-unused-vars
    const getStilettoHeels = () => products.filter((p) => 
        p.category === "Stiletto" || 
        p.name.toLowerCase().includes("stiletto")
    ).slice(0, 4);
    
    // eslint-disable-next-line no-unused-vars
    const getBlockHeels = () => products.filter((p) => 
        p.category === "Block" || 
        p.name.toLowerCase().includes("block")
    ).slice(0, 4);
    
    // eslint-disable-next-line no-unused-vars
    const getKittenHeels = () => products.filter((p) => 
        p.category === "Kitten" || 
        p.name.toLowerCase().includes("kitten")
    ).slice(0, 4);
    
    // eslint-disable-next-line no-unused-vars
    const getNewestArrivals = () => products.filter((p) => p.isNewArrival).slice(0, 4);
    
    const getBestSellers = () => products.filter((p) => p.isFeatured).slice(0, 4);
    
    // eslint-disable-next-line no-unused-vars
    const getDiscountedProducts = () =>
        products
            .filter((p) => p.discount > 0)
            .sort((a, b) => b.discount - a.discount)
            .slice(0, 4);

    const calculateDiscountPrice = (price, discount) => {
        if (discount === 0) return price;
        const discountAmount = (price * discount) / 100;
        return price - discountAmount;
    };

    const brands = [
        {
            name: "Christian Louboutin",
            logo: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Jimmy Choo",
            logo: "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Manolo Blahnik",
            logo: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
        {
            name: "Stuart Weitzman",
            logo: "https://images.unsplash.com/photo-1520256862855-398228c41684?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
        },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <HeroBanner 
                imageUrl={heroImageUrl}
                title="Giày Cao Gót Nữ"
                description="Khám phá bộ sưu tập giày cao gót cao cấp, tôn dáng và tạo nên vẻ sang trọng cho mọi bước chân"
                buttonText="Khám Phá Ngay"
            />

            <div className="container mx-auto px-4 py-6">
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

                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
                    <div className="bg-white h-full w-4/5 max-w-sm p-4 ml-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Bộ lọc</h3>
                            <button className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
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

export default WomensHeels;
