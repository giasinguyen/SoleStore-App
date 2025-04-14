import { useEffect, useState } from "react";
import { productAPI, reviewAPI } from "../services/api";
import '../App.css'; 

// Import our reusable components
import HeroBanner from "../components/ui/common/HeroBanner";
import ProductFilter from "../components/ui/common/ProductFilter";
import ProductGrid from "../components/ui/common/ProductGrid";
import CustomerReviews from "../components/ui/common/CustomerReviews";
import RelatedProducts from "../components/ui/common/RelatedProducts";

const heroImageUrl = "https://img.lovepik.com/photo/50084/7991.jpg_wh860.jpg";

const MensSports = () => {
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
                
                // Lọc ra giày thể thao nam
                const mensSports = productsData.filter(
                    (product) =>
                        product.gender === "Nam" && 
                        (product.category === "Giày thể thao" || 
                        (product.name && 
                            (product.name.toLowerCase().includes("thể thao") || 
                            product.name.toLowerCase().includes("running") || 
                            product.name.toLowerCase().includes("sport"))))
                );

                // Nếu không có sản phẩm giày thể thao nam, sử dụng sản phẩm nam khác
                const productsToUse =
                    mensSports.length > 0
                        ? mensSports
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
                activeCategory === "running"
                    ? "Chạy bộ"
                    : activeCategory === "training"
                        ? "Tập luyện"
                        : "Bóng đá",
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
            if (activeCategory === "running") {
                result = result.filter(p => 
                    p.category === "Running" || 
                    (p.subCategory && p.subCategory === "Running") || 
                    p.name.toLowerCase().includes("running") ||
                    p.name.toLowerCase().includes("chạy")
                );
            } else if (activeCategory === "training") {
                result = result.filter(p => 
                    p.category === "Training" || 
                    (p.subCategory && p.subCategory === "Training") || 
                    p.name.toLowerCase().includes("training") ||
                    p.name.toLowerCase().includes("tập")
                );
            } else if (activeCategory === "football") {
                result = result.filter(p => 
                    p.category === "Football" || 
                    (p.subCategory && p.subCategory === "Football") || 
                    p.name.toLowerCase().includes("football") ||
                    p.name.toLowerCase().includes("bóng đá")
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
            name: "Nike",
            logo: "https://static.nike.com/a/images/f_jpg,q_auto:eco/61b4738b-e1e1-4786-8f6c-26aa0008e80b/swoosh-logo-black.png",
        },
        {
            name: "Adidas",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/800px-Adidas_Logo.svg.png",
        },
        {
            name: "Puma",
            logo: "https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png",
        },
        {
            name: "New Balance",
            logo: "https://1000logos.net/wp-content/uploads/2017/05/New-Balance-symbol.jpg",
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
                title="Giày Thể Thao Nam"
                description="Khám phá bộ sưu tập giày thể thao nam cao cấp, tối ưu hiệu suất và phong cách cho mọi hoạt động"
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

export default MensSports;

