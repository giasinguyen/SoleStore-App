import { useState, useEffect } from "react";
import { Button, Badge } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { useOrder } from "../../../context/ContextAPI";
import { toast } from 'react-toastify';
import { productAPI } from "../../../services/api";
import "./NewArrivals.css";

const NewArrivals = () => {
    const { addToCart } = useOrder();
    const [itemOffset, setItemOffset] = useState(0);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 4;
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productAPI.getAllProducts();
                const newArrivals = data.filter(product => product.isNewArrival === true);
                setProducts(newArrivals);
                setFilteredProducts(newArrivals);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm mới:', error);
                setProducts([]);
                setFilteredProducts([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchProducts();
    }, []);

    const endOffset = itemOffset + itemsPerPage;
    const currentProducts = filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
    };
    
    // Hàm trợ giúp để lấy URL hình ảnh sản phẩm
    const getProductImage = (product, index = 0) => {
        if (product.images && product.images.length > index) {
            return product.images[index];
        } else if (product.image) {
            return product.image;
        } else {
            return "https://via.placeholder.com/400x500?text=No+Image";
        }
    };
    
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Thêm sản phẩm với kích thước mặc định đầu tiên
        const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : '';
        
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            size: size,
            image: getProductImage(product)
        });
        
        toast.success(`Đã thêm ${product.name} vào giỏ hàng`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });
    };

    return (
        <section className="new-arrivals-section container-custom py-5">
            <div className="section-header d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold position-relative d-inline-block">
                    Sản Phẩm Mới
                    <div className="title-underline"></div>
                </h2>
                <Link to="/products" className="view-all-link">
                    Xem tất cả
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </Link>
            </div>

            {loading ? (
                <div className="row">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-md-3 col-sm-6">
                            <div className="product-skeleton">
                                <div className="skeleton-img"></div>
                                <div className="skeleton-text"></div>
                                <div className="skeleton-text short"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : currentProducts.length === 0 ? (
                <div className="no-products">
                    <p>Không tìm thấy sản phẩm mới nào.</p>
                </div>
            ) : (
                <div className="row g-4">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="col-md-3 col-sm-6 product-column">
                            <div 
                                className="product-card-wrapper"
                                onMouseEnter={() => setHoveredProduct(product.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <Link
                                    to={`/product/${product.id}`}
                                    className="text-decoration-none text-dark"
                                >
                                    <div className="modern-card h-100 shadow-hover position-relative overflow-hidden">
                                        <div className="card-badges position-absolute start-0 top-0 m-2 d-flex flex-column gap-2">
                                            {product.isNewArrival && (
                                                <Badge bg="warning" className="new-badge">
                                                    NEW
                                                </Badge>
                                            )}
                                            {product.discount > 0 && (
                                                <Badge bg="danger" className="sale-badge">
                                                    -{product.discount}%
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        <div className="product-image-container">
                                            <img
                                                src={hoveredProduct === product.id && 
                                                    ((product.images && product.images.length > 1) || product.image) 
                                                    ? getProductImage(product, 1) 
                                                    : getProductImage(product, 0)}
                                                alt={product.name}
                                                className="card-img-top product-image"
                                                onError={(e) => {
                                                    e.target.src = "https://via.placeholder.com/400x500?text=No+Image";
                                                }}
                                            />
                                            
                                            <div className={`quick-actions ${hoveredProduct === product.id ? 'visible' : ''}`}>
                                                <Button 
                                                    variant="dark" 
                                                    className="quick-cart-btn"
                                                    onClick={(e) => handleAddToCart(e, product)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                    </svg>
                                                </Button>
                                                <Link 
                                                    to={`/product/${product.id}`}
                                                    className="btn btn-light quick-view-btn"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                        
                                        <div className="card-body p-3">
                                            <div className="d-flex justify-content-between">
                                                <p className="category-tag">{product.category}</p>
                                                <div className="rating">
                                                    <span className="star-icon">★</span>
                                                    <span>{product.rating}</span>
                                                </div>
                                            </div>
                                            <h5 className="product-title">{product.name}</h5>
                                            <div className="price-section">
                                                <h5 className="current-price">{formatPrice(product.price)}</h5>
                                                {product.originalPrice && product.discount > 0 && (
                                                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {pageCount > 1 && (
                <div className="pagination-container mt-4">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="<"
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
        </section>
    );
};

export default NewArrivals;
