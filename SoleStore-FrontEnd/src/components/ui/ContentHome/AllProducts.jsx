import { useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { productAPI } from "../../../services/api";

// Hàm định dạng tiền tệ Việt Nam
const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(price);
};

const AllProducts = () => {
    const [category, setCategory] = useState('Tất cả danh mục');
    const [brand, setBrand] = useState('Lọc theo hãng');
    const [sortBy, setSortBy] = useState('Lọc theo giá');
    const [itemOffset, setItemOffset] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productAPI.getAllProducts();

                setProducts(data);

                // Lấy danh sách danh mục và thương hiệu độc nhất
                const uniqueCategories = [...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);

                const uniqueBrands = [...new Set(data.map(product => product.brand))];
                setBrands(uniqueBrands);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // --- FILTER + SORT ---
    const filteredProducts = products
        .filter((product) => {
            let categoryMatch = category === 'Tất cả danh mục' || product.category === category;
            let brandMatch = brand === 'Lọc theo hãng' || product.brand === brand;
            return categoryMatch && brandMatch;
        })
        .sort((a, b) => {
            if (sortBy === 'Low to High') return a.price - b.price;
            if (sortBy === 'High to Low') return b.price - a.price;
            if (sortBy === 'Newest First') return new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now());
            if (sortBy === 'Popular') return (b.rating || 0) - (a.rating || 0);
            return 0;
        });

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
    };

    return (
        <section id='1' className="py-16 bg-white pt-5">
            <div className="container-custom mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10">All Products</h2>

                {/* Filters */}
                <div className="d-flex flex-wrap gap-4 pb-3">
                    {/* Category Filter */}
                    <div className="w-full md:w-auto">
                        <select
                            className="w-full md:w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setItemOffset(0);
                            }}
                        >
                            <option>Tất cả danh mục</option>
                            {categories.map((cat, index) => (
                                <option key={index}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Brand Filter */}
                    <div className="w-full md:w-auto">
                        <select
                            className="w-full md:w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                                setItemOffset(0);
                            }}
                        >
                            <option>Lọc theo hãng</option>
                            {brands.map((brandName, index) => (
                                <option key={index}>{brandName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Sort Filter */}
                    <div className="w-full md:w-auto">
                        <select
                            className="w-full md:w-48 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                setItemOffset(0);
                            }}
                        >
                            <option>Lọc theo giá</option>
                            <option>Low to High</option>
                            <option>High to Low</option>
                            <option>Newest First</option>
                            <option>Popular</option>
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="row g-4">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="col-md-3">
                                <div className="card h-100 shadow-sm product-card position-relative">
                                    <div className="placeholder-glow" style={{ height: '200px' }}></div>
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <div className="placeholder col-7 mb-2"></div>
                                            <div className="placeholder col-5"></div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div className="placeholder col-4"></div>
                                            <div className="placeholder col-3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : currentItems.length === 0 ? (
                    <div className="text-center py-5">
                        <p className="text-lg text-gray-600">Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc.</p>
                        <button
                            className="btn btn-outline-primary mt-3"
                            onClick={() => {
                                setCategory('Tất cả danh mục');
                                setBrand('Lọc theo hãng');
                                setSortBy('Lọc theo giá');
                            }}
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                ) : (
                    <div className="row g-4">
                        {currentItems.map((product) => (
                            <div key={product.id} className="col-md-3">
                                <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                                    <div className="card h-100 shadow-sm product-card position-relative">
                                        {product.isNewArrival && (
                                            <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">
                                                NEW
                                            </span>
                                        )}
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="card-img-top"
                                        />
                                        <div className="card-body d-flex flex-column justify-content-between">
                                            <div>
                                                <h5 className="card-title">{product.name}</h5>
                                                <p className="text-muted">{product.category}</p>
                                            </div>
                                            {product.originalPrice && (
                                                <span className="fs-6 text-muted text-decoration-line-through ms-2">
                                                    {formatCurrency(product.originalPrice)}
                                                </span>
                                            )}
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                {/* Định dạng giá theo tiền VND */}
                                                <h5 className="text-danger fw-bold">{formatCurrency(product.price)}</h5>
                                                <Button as={Link} to={`/product/${product.id}`}
                                                    className="btn btn-dark btn-sm d-flex align-items-center"
                                                >
                                                    Xem thêm
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!loading && pageCount > 1 && (
                    <div className="mt-8 pt-3">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< Prev"
                            renderOnZeroPageCount={null}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllProducts;