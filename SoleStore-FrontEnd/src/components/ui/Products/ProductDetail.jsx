import { Minus, Plus, RefreshCw, Shield, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useOrder } from '../../../context/ContextAPI';
import products from "../../../Data/products.json";
import "./ProductDetail.css";
import RatingStars from './RatingStars';

// Hàm định dạng tiền tệ Việt Nam
const formatCurrency = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(price); // Quy đổi từ USD sang VND với tỷ giá ước tính
};

const ProductDetail = () => {
    const { addToOrder } = useOrder();
    const { productId } = useParams();
    const productIdd = parseInt(productId);
    const product = products.find((item) => item.id === productIdd);

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(product?.images[0] || '');
    
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
            alert('Vui lòng chọn size');
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

        addToOrder(orderItem);
        alert(`Đã thêm ${quantity} sản phẩm ${product.name} (Size: ${selectedSize}) vào giỏ hàng`);
    };

    // Tìm sản phẩm liên quan
    const relatedProducts = products
        .filter(item => item.id !== product.id && item.category === product.category)
        .slice(0, 3); // Giới hạn 3 sản phẩm liên quan

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
        <div className="my-5 container-custom">
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
                        <RatingStars rate={product.rating} />
                        <span className="text-muted small ms-2">({product.reviewCount} đánh giá)</span>
                    </div>

                    {/* Price - Định dạng VND */}
                    <div className="price-container mb-4">
                        <span className="fs-3 fw-bold text-danger">{formatCurrency(product.price)}</span>
                        {product.originalPrice && (
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

            {/* ----------- SẢN PHẨM LIÊN QUAN ----------- */}
            <div className="related-products mt-5">
                <h3 className="mb-4">Sản phẩm liên quan</h3>
                <Row>
                    {relatedProducts.map(item => (
                        <Col key={item.id} md={4} className="mb-4">
                            <Card className="h-100 shadow-sm border-0">
                                <Card.Img
                                    variant="top"
                                    src={item.images[0]}
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Badge bg="secondary" className="mb-2">{item.category}</Badge>
                                    <Card.Title className="fs-5">{item.name}</Card.Title>
                                    {/* Định dạng giá VND cho sản phẩm liên quan */}
                                    <Card.Text className="text-danger fw-bold">{formatCurrency(item.price)}</Card.Text>

                                    <Button
                                        as={Link}
                                        to={`/product/${item.id}`}
                                        variant="outline-primary"
                                        className="mt-auto"
                                    >
                                        Xem chi tiết
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProductDetail;