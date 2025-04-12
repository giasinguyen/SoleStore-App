import giayDauTrang from "../../../assets/images/giay-dau-trang.jpg";
import "./HeroSection.css";

const HeroSection = () => {
    return (<>
        <div className="hero-section">
            <img src={giayDauTrang} alt="Background" className="hero-image" />

            <div className="overlay"></div>

            <div className="hero-content">
                <h1>Bước vào sự thoải mái & Phong cách</h1>
                <p>
                    Khám phá các xu hướng mới nhất về giày dép với bộ sưu tập giày cao cấp độc quyền của chúng tôi cho nam và nữ.
                </p>
                <div className="buttons">
                    <button className="btn btn-light">Giày nam</button>
                    <button className="btn btn-dark">Giày nữ</button>
                </div>
            </div>
        </div>
    </>

    );
};

export default HeroSection;