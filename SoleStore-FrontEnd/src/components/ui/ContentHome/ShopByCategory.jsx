import { Link } from "react-router-dom";
import "./ShopByCategory.css";

const ShopByCategory = () => {
    const categories = [
        {
            id: 1,
            title: "Giày Nam",
            description: "Khám phá bộ sưu tập giày nam đa dạng với nhiều phong cách",
            image: "https://res.cloudinary.com/dr7iloxoa/image/upload/v1741345708/tggnupnovzijwbyvulqf.jpg",
            link: "/mens-sports",
            subcategories: [
                { name: "Thể Thao", link: "/mens-sports" },
                { name: "Da", link: "/mens-leather" },
                { name: "Sandal", link: "/mens-sandals" }
            ]
        },
        {
            id: 2,
            title: "Giày Nữ",
            description: "Khám phá xu hướng giày nữ mới nhất cho mọi dịp",
            image: "https://res.cloudinary.com/dr7iloxoa/image/upload/v1741345708/brisqbt4ineyvjspbk74.jpg",
            link: "/womens-sports",
            subcategories: [
                { name: "Thể Thao", link: "/womens-sports" },
                { name: "Cao Gót", link: "/womens-heels" },
                { name: "Sandal", link: "/womens-sandals" }
            ]
        },
        {
            id: 3,
            title: "Hàng Mới Về",
            description: "Khám phá những mẫu giày mới nhất trong bộ sưu tập của chúng tôi",
            image: "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
            link: "/products",
            subcategories: [
                { name: "Tất cả", link: "/womens-sports" }
            ]
        },
    ];

    return (
        <section className="category-section container-custom my-5 py-5">
            <div className="section-header text-center mb-5">
                <h2 className="fw-bold position-relative d-inline-block">
                    Mua Sắm Theo Danh Mục
                    <div className="title-underline"></div>
                </h2>
                <p className="text-muted mt-3">Khám phá bộ sưu tập giày đa dạng phù hợp với phong cách của bạn</p>
            </div>

            <div className="row g-4">
                {categories.map((category) => (
                    <div key={category.id} className="col-lg-4 col-md-6">
                        <div className="category-card-container">
                            <div className="category-card">
                                <div className="category-card-front">
                                    <div className="image-container">
                                        <img
                                            src={category.image}
                                            alt={category.title}
                                            loading="lazy"
                                        />
                                        <div className="overlay"></div>
                                    </div>
                                    <div className="content">
                                        <h3>{category.title}</h3>
                                        <p>{category.description}</p>
                                        <span className="explore-text">
                                            Khám Phá
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                                <div className="category-card-back">
                                    <div className="back-content">
                                        <h3>Danh Mục {category.title}</h3>
                                        <ul className="subcategory-list">
                                            {category.subcategories.map((subcategory, index) => (
                                                <li key={index}>
                                                    <Link to={subcategory.link} className="subcategory-link">
                                                        {subcategory.name}
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                                        </svg>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link to={category.link} className="all-products-btn">
                                            Xem Tất Cả Sản Phẩm
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="text-center mt-4">
                <Link to="/products" className="btn-view-all-categories">
                    Xem Tất Cả Danh Mục
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default ShopByCategory;
