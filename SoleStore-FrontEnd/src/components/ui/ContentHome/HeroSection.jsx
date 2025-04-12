import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import "./HeroSection.css";

// Import hình ảnh banner
import SlideShow1 from "../../../assets/images/SlideShow1.png";
import SlideShow2 from "../../../assets/images/SlideShow2.png";
import SlideShow3 from "../../../assets/images/SlideShow3.png";

const HeroSection = () => {
    const [index, setIndex] = useState(0);
    
    const slides = [
        {
            image: SlideShow1,
            title: "Bước vào sự thoải mái & Phong cách",
            subtitle: "Bộ sưu tập mới nhất 2025",
            description: "Khám phá các xu hướng mới nhất về giày dép với bộ sưu tập giày cao cấp độc quyền của chúng tôi.",
            primaryLink: "/mens-sports",
            secondaryLink: "/womens-sports",
            primaryText: "Giày nam",
            secondaryText: "Giày nữ",
            position: "left" // Điều này kiểm soát vị trí nội dung trên slide
        },
        {
            image: SlideShow2,
            title: "Phong cách thể thao",
            subtitle: "Giảm giá lên đến 40%",
            description: "Nâng cao hiệu suất của bạn với bộ sưu tập giày thể thao mới nhất và thoải mái nhất.",
            primaryLink: "/mens-sports",
            secondaryLink: "/womens-sports",
            primaryText: "Mua ngay",
            secondaryText: "Xem thêm",
            position: "right" 
        },
        {
            image: SlideShow3,
            title: "Xu hướng thiết kế cao cấp",
            subtitle: "Bộ sưu tập giới hạn",
            description: "Khám phá các thiết kế cao cấp giúp bạn nổi bật trong mọi dịp.",
            primaryLink: "/mens-leather",
            secondaryLink: "/womens-heels",
            primaryText: "Giày da",
            secondaryText: "Giày cao gót",
            position: "center"
        }
    ];

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    // Hiệu ứng tự động chuyển slide
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="hero-section">
            <Carousel 
                activeIndex={index} 
                onSelect={handleSelect}
                controls={true}
                indicators={true}
                fade
                className="modern-carousel"
                interval={null} // Đã xử lý bằng useEffect
            >
                {slides.map((slide, idx) => (
                    <Carousel.Item key={idx} className="hero-carousel-item">
                        {/* Hình ảnh và lớp overlay */}
                        <div className="carousel-image-container">
                            <img
                                className="d-block w-100 carousel-image"
                                src={slide.image}
                                alt={`Slide ${idx + 1}`}
                            />
                            <div className="carousel-overlay"></div>
                        </div>

                        {/* Nội dung slide */}
                        <div className={`carousel-content ${slide.position}`}>
                            <div className="content-inner">
                                <div className="animate-subtitle">{slide.subtitle}</div>
                                <h1 className="animate-title">{slide.title}</h1>
                                <p className="animate-description">{slide.description}</p>
                                <div className="carousel-buttons">
                                    <Button 
                                        as={Link} 
                                        to={slide.primaryLink} 
                                        variant="primary" 
                                        className="animate-btn primary-btn"
                                    >
                                        {slide.primaryText}
                                    </Button>
                                    <Button 
                                        as={Link} 
                                        to={slide.secondaryLink} 
                                        variant="outline-light" 
                                        className="animate-btn secondary-btn"
                                    >
                                        {slide.secondaryText}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Chỉ báo tùy chỉnh */}
            <div className="custom-indicators">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        className={`custom-indicator ${idx === index ? 'active' : ''}`}
                        onClick={() => setIndex(idx)}
                    />
                ))}
            </div>
            
            {/* Nút cuộn xuống */}
            <a href="#new-arrivals" className="scroll-down-button">
                <div className="chevron"></div>
                <div className="chevron"></div>
                <div className="chevron"></div>
            </a>
        </div>
    );
};

export default HeroSection;