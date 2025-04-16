import { NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../../assets/images/logo.png";

const Logo = () => {
    return (
        <NavbarBrand as={Link} to="/" className="d-flex align-items-center">
            <div className="logo-container me-2">
                <img
                    src={logo}
                    alt="SoleStyle Logo"
                    className="logo-image"
                />
            </div>
            <span className="brand-text">SoleStore<span className="text-amber-400">VN</span></span>

            <style>{`
                .logo-container {
                    w
                }
                
                .logo-image {
                    width: 28px;
                    height: 28px;
                    object-fit: contain;
                }
                
                .brand-text {
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: white;
                    letter-spacing: 0.5px;
                }
                
                .text-amber-400 {
                    color: #fbbf24;
                }
            `}</style>
        </NavbarBrand>
    );
};

export default Logo;