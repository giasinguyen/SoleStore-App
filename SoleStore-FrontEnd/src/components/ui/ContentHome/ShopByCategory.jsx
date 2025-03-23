import React from "react";
import "./ShopByCategory.css";

const ShopByCategory = () => {
    const categories = [
        {
            id: 1,
            title: "Men's Collection",
            description: "Explore our range of stylish men's shoes",
            image:
                "https://res.cloudinary.com/dr7iloxoa/image/upload/v1741345708/tggnupnovzijwbyvulqf.jpg",
        },
        {
            id: 2,
            title: "Women's Collection",
            description: "Discover trending footwear for women",
            image:
                "https://res.cloudinary.com/dr7iloxoa/image/upload/v1741345708/brisqbt4ineyvjspbk74.jpg",
        },
        {
            id: 3,
            title: "New Arrivals",
            description: "Check out our latest footwear collection",
            image:
                "https://images.unsplash.com/photo-1560072810-1cffb09faf0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
        },
    ];

    return (
        <section className="container-custom my-5">
            <h1 className="text-center mb-4 fw-bold pt-4 ">Danh Mục Giày</h1>

            <div className="row g-4">
                {categories.map((category) => (
                    <div key={category.id} className="col-md-4">
                        <div className="category-card position-relative overflow-hidden shadow-sm">
                            <img
                                src={category.image}
                                alt={category.title}
                                className="img-fluid w-100 h-100 object-fit-cover"
                            />
                            <div className="overlay-text p-3 d-flex flex-column justify-content-end">
                                <h3 className="text-white fw-bold mb-2">{category.title}</h3>
                                <p className="text-white">{category.description}</p>
                                <button className="btn btn-light btn-sm mt-2 align-self-start">
                                    <a href={`#${category.id}`}>
                                        Shop Now
                                    </a>

                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShopByCategory;
