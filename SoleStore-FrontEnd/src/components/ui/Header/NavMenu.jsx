import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    return (
        <Nav className="mx-auto align-items-center">
            {/* Home */}
            <Nav.Link as={Link} to="/" className="nav-link-custom mx-1">
                Trang chủ
            </Nav.Link>

            {/* Men's Shoes Dropdown */}
            <NavDropdown 
                title="Giày nam" 
                id="men-dropdown" 
                className="nav-dropdown-custom mx-1"
            >
                <NavDropdown.Item as={Link} to="/mens-sports" className="dropdown-item-custom">Giày thể thao nam</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mens-sandals" className="dropdown-item-custom">Sandals nam</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/mens-leather" className="dropdown-item-custom">Giày da nam</NavDropdown.Item>
            </NavDropdown>

            {/* Women's Shoes Dropdown */}
            <NavDropdown 
                title="Giày nữ" 
                id="women-dropdown" 
                className="nav-dropdown-custom mx-1"
            >
                <NavDropdown.Item as={Link} to="/womens-sports" className="dropdown-item-custom">Giày thể thao nư</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/womens-sandals" className="dropdown-item-custom">Sandals nữ</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/womens-heels" className="dropdown-item-custom">Giày cao gót nữ</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/blogs" className="nav-link-custom mx-1">
                Tin tức
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className="nav-link-custom mx-1">
                Liên hệ
            </Nav.Link>

            <style>{`
                .nav-link-custom {
                    color: white !important;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    position: relative;
                    padding: 0.5rem 0.75rem;
                }
                
                .nav-link-custom:hover, .nav-link-custom:focus {
                    color: #fbbf24 !important;
                    transform: translateY(-2px);
                }
                
                .nav-link-custom::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: 0;
                    left: 50%;
                    background: linear-gradient(to right, #f59e0b, #ea580c);
                    transition: all 0.3s ease;
                    transform: translateX(-50%);
                    opacity: 0;
                    border-radius: 2px;
                }
                
                .nav-link-custom:hover::after {
                    width: 70%;
                    opacity: 1;
                }
                
                .nav-dropdown-custom .dropdown-toggle {
                    color: white !important;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    padding: 0.5rem 0.75rem;
                }
                
                .nav-dropdown-custom .dropdown-toggle:hover {
                    color: #fbbf24 !important;
                    transform: translateY(-2px);
                }
                
                .dropdown-menu {
                    background: rgba(31, 41, 55, 0.98);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    padding: 0.5rem 0;
                }
                
                .dropdown-item-custom {
                    color: white;
                    transition: all 0.3s ease;
                    padding: 0.5rem 1.5rem;
                }
                
                .dropdown-item-custom:hover {
                    background: linear-gradient(to right, rgba(245, 158, 11, 0.1), rgba(234, 88, 12, 0.1));
                    color: #fbbf24;
                    transform: translateX(5px);
                }
            `}</style>
        </Nav>
    );
};

export default NavMenu;