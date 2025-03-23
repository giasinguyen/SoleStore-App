import 'react';
import './HomeBanner.css';

const HomeBanner = () => {
    return (
        <div className="home-banner">
            <div className="banner-overlay"></div>
            <div className="home-banner-content">
                <h1>Bộ Sưu Tập Mùa Hè 2023</h1>
                <p>
                    Hãy sẵn sàng cho mùa hè với bộ sưu tập giày nhẹ và thoáng khí mới nhất của chúng tôi. <br />
                    Hoàn hảo cho những ngày đi biển và các hoạt động ngoài trời.
                </p>
            </div>

            <div className="home-banner-image">
                <img src="https://images.unsplash.com/photo-1603808033192-082d6919d3e1" alt="Summer Shoes" />
            </div>
        </div>
    );
};

export default HomeBanner;
