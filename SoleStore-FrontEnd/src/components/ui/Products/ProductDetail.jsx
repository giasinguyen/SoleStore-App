import { motion } from "framer-motion";
import { Minus, Plus, RefreshCw, Shield, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useOrder } from '../../../context/ContextAPI';
import { productAPI, reviewAPI } from "../../../services/api";
import "./ProductDetail.css";
import RatingStars from './RatingStars';
import ReviewCard from "./ReviewCard";

const STAR_OPTIONS = [5, 4, 3, 2, 1];

const ProductDetail = () => {
    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN') + ' vnđ';
    };

    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const [products, setProduct] = useState([]);
    const [allReviews, setAllReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [selectedStar, setSelectedStar] = useState(null);
    const { addToCart } = useOrder();
    const { productId } = useParams();
    const productIdd = parseInt(productId);
    const product = products.find((item) => item.id === productIdd);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productAPI.getAllProducts();
                setProduct(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu product:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await reviewAPI.getAllReviews();
                setReviews(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu review:', error);
            }
        };
        fetchReviews();
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [productId]);

    useEffect(() => {
        if (product && product.images && product.images.length > 0) {
            setSelectedImage(product.images[0]);
        }
    }, [product]);

    const handleIncreaseQuantity = () => setQuantity(quantity + 1);
    const handleDecreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setNotification({
                show: true,
                message: `Vui lòng chọn size!`,
                type: "error",
            });
            return;
        }

        const orderItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            size: selectedSize,
            image: selectedImage
        };

        addToCart(orderItem);
        setNotification({
            show: true,
            message: `Đã thêm ${quantity} sản phẩm ${product.name} (Size: ${selectedSize}) vào giỏ hàng`,
            type: "success",
        });
    };

    useEffect(() => {
        if (notification.show) {
            const timer = setTimeout(() => {
                setNotification({ ...notification, show: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const reviewsForProduct = reviews.filter(
            review => review.idProduct === productId
        );
        setAllReviews(reviewsForProduct);
        setFilteredReviews(reviewsForProduct);
        setSelectedStar(null);
    }, [productId, reviews]);

    const handleFilterByStar = (star) => {
        setSelectedStar(star);
        if (star === null) {
            setFilteredReviews(allReviews);
        } else {
            setFilteredReviews(allReviews.filter(r => r.rating === star));
        }
    };

    const relatedProducts = product
        ? products
            .filter(item => item.id !== product.id && item.category === product.category)
            .slice(0, 3)
        : [];

    if (!product) {
        return (
            <Container className="my-5">
                <h2>Không tìm thấy sản phẩm!</h2>
                <Button as={Link} to="/mens-sports" variant="primary" className="mt-3">
                    Quay lại danh sách sản phẩm
                </Button>
            </Container>
        );
    }
    return (
        <div className="pt-4 my-5 container-custom">
            <motion.div
                className={`fixed  right-5 z-50 px-6 py-3 rounded-lg shadow-lg ${notification.type === "success" ? "bg-green-600" : "bg-red-600"
                    } text-white`}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                    opacity: notification.show ? 1 : 0,
                    x: notification.show ? 0 : 100
                }}
                transition={{ type: "spring", damping: 20 }}
            >
                <div className="flex items-center">
                    {notification.type === "success" ? (
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    )}
                    <p>{notification.message}</p>
                </div>
            </motion.div>

            <Row className="gap-4 justify-content-evenly">
                {/* Ảnh và gallery */}
                <Col md={5}>
                    <div className="product-gallery mb-4">
                        <div className="main-image mb-3">
                            <img src={selectedImage} alt={product.name} className="img-fluid rounded shadow" />
                        </div>
                        <div className="d-flex gap-2">
                            {product.images.slice(0, 4).map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                                    onClick={() => setSelectedImage(img)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={img} alt={`Thumbnail ${index + 1}`} width="80" className="rounded shadow-sm" />
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>

                {/* Thông tin sản phẩm */}
                <Col md={5}>
                    <h1 className="fw-bold mb-2">{product.name}</h1>
                    <Badge bg="secondary" className="mb-3">{product.category}</Badge>

                    {/* Rating */}
                    <div className="rating-container mb-3">
                        <RatingStars rate={product.rating === 0 ? 5 : product.rating} />
                        <span className="text-muted small ms-2">({product.reviewCount} đánh giá)</span>
                    </div>

                    {/* Price - Định dạng VND */}
                    <div className="price-container mb-4">
                        <span className="fs-3 fw-bold text-danger">{formatCurrency(product.price)}</span>
                        {formatCurrency(product.originalPrice) && (
                            <span className="fs-5 text-muted text-decoration-line-through ms-2">
                                {formatCurrency(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Mô tả */}
                    <p className="product-description mb-4">{product.description}</p>

                    {/* Chọn size */}
                    <div className="mb-4">
                        <h5>Chọn size:</h5>
                        <div className="d-flex flex-wrap gap-2">
                            {product.sizes.map((size) => (
                                <Button
                                    key={size}
                                    variant={selectedSize === size ? 'primary' : 'outline-secondary'}
                                    onClick={() => setSelectedSize(size)}
                                    className="flex-grow-0"
                                    style={{ minWidth: '60px' }}
                                >
                                    {size}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Chọn số lượng */}
                    <div className="mb-4">
                        <h5>Số lượng:</h5>
                        <div className="d-flex align-items-center">
                            <Button onClick={handleDecreaseQuantity} variant="outline-secondary">
                                <Minus />
                            </Button>
                            <input
                                type="text"
                                className="form-control text-center mx-2"
                                value={quantity}
                                readOnly
                                style={{ width: '60px' }}
                            />
                            <Button onClick={handleIncreaseQuantity} variant="outline-secondary">
                                <Plus />
                            </Button>
                        </div>
                    </div>

                    {/* Thêm vào giỏ */}

                    <Button
                        variant="success"
                        size="lg"
                        className="w-100 mb-4"
                        onClick={handleAddToCart}
                    >

                        Thêm vào giỏ hàng

                    </Button>

                    {/* Chính sách */}
                    <Row className="text-center">
                        <Col>
                            <Truck className="text-primary mb-2" />
                            <p>Miễn phí vận chuyển trên 2.000.000đ</p>
                        </Col>
                        <Col>
                            <RefreshCw className="text-primary mb-2" />
                            <p>Đổi trả trong 30 ngày</p>
                        </Col>
                        <Col>
                            <Shield className="text-primary mb-2" />
                            <p>Bảo hành 2 năm</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* --------------------REVIEWS-------------------- */}
            <div style={{ marginLeft: '0 auto', padding: 70 }}>
                <h2>ĐÁNH GIÁ SẢN PHẨM</h2>

                <div style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleFilterByStar(null)}
                        style={{
                            padding: '5px 12px',
                            border: '1px solid #ddd',
                            borderRadius: 5,
                            background: selectedStar === null ? '#fffbf8' : '#fff',
                            color: selectedStar === null ? '#e74c3c' : '#333'
                        }}
                    >
                        Tất Cả
                    </button>

                    {STAR_OPTIONS.map((star) => (
                        <button
                            key={star}
                            onClick={() => handleFilterByStar(star)}
                            style={{
                                padding: '5px 12px',
                                border: '1px solid #ddd',
                                borderRadius: 5,
                                background: selectedStar === star ? '#fffbf8' : '#fff',
                                color: selectedStar === star ? '#e74c3c' : '#333'
                            }}
                        >
                            {star} Sao
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 20 }}>
                    {filteredReviews.length > 0 ? (
                        filteredReviews.map((review, idx) => (
                            <ReviewCard key={idx} review={review} />
                        ))
                    ) : (
                        <p>Không có đánh giá nào.</p>
                    )}
                </div>
            </div>
            {/* ----------- SẢN PHẨM LIÊN QUAN ----------- */}
            <div style={{ textAlign: "center" }}>
                <strong >______________________________________________________________________________________________________________________________</strong>
            </div>

            <div className="related-products mt-5">
                <h2 className="mb-4">SẢN PHẨM LIÊN QUAN</h2>
                <div className="row g-4">
                    {relatedProducts.map(product => (
                        <div key={product.id} className="col-md-3">

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
                                {product.discount > 0 && (
                                    <div className="badge badge-sale absolute top-2 right-2 z-10 px-2 py-1 rounded-md font-medium bg-red-500 text-white">
                                        -{product.discount}%
                                    </div>
                                )}
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
                                        <h5 className=" fs-5 text-success fw-bold">{formatCurrency(product.price)}</h5>

                                        <Button as={Link} to={`/product/${product.id}`}
                                            className="btn btn-dark btn-sm d-flex align-items-center"
                                        >
                                            Xem thêm
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;