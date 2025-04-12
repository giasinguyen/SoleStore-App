import { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { useOrder } from "../../../context/ContextAPI";
import { toast } from 'react-toastify';
import productsData from "../../../Data/products.json";
import "./NewArrivals.css";

const NewArrivals = () => {
    const { addToCart } = useOrder();
    const [itemOffset, setItemOffset] = useState(0);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const itemsPerPage = 4;
    
    const filteredProducts = productsData
        .filter((product) => product.isNewArrival === true);

    const endOffset = itemOffset + itemsPerPage;
    const products = filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const formatPrice = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
    };
    
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        
        const orderItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            size: product.sizes[0], // Default to the first available size
            image: product.images[0]
        };
        
        addToCart(orderItem);
        toast.success(`Đã thêm ${product.name} vào giỏ hàng`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: "🛒"
        });
    };
    
    return (
        <section id="new-arrivals" className="container-custom my-5 pt-5">
            <div className="section-header d-flex justify-content-between align-items-center mb-4">
                <div className="position-relative">
                    <h1 className="fw-bold section-title">Giày Mới Nhất</h1>
                    <div className="title-underline"></div>
                </div>
                <Link to="/products" className="btn-see-all">
                    Xem tất cả
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </Link>
            </div>

            <div className="row g-4">
                {products.map((product) => (
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
                                            src={hoveredProduct === product.id && product.images.length > 1 
                                                ? product.images[1] 
                                                : product.images[0]}
                                            alt={product.name}
                                            className="card-img-top product-image"
                                        />
                                        
                                        <div className={`quick-actions ${hoveredProduct === product.id ? 'visible' : ''}`}>
                                            <Button 
                                                variant="dark" 
                                                className="quick-cart-btn"
                                                onClick={(e) => handleAddToCart(e, product)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
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
                                            {product.originalPrice && (
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
            
            {pageCount > 1 && (
                <div className="pagination-container mt-4">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel={<span>Sau <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></span>}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel={<span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg> Trước</span>}
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
