import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./NavMenu.css";

const NavMenu = () => {
    return (
        <Nav className="mx-auto align-items-center" >
            {/* Home */}
            <Nav.Link as={Link} to="/" className="nav-link-custom mx-1" style={{ outline: "none" }}>
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
                <NavDropdown.Item as={Link} to="/womens-sports" className="dropdown-item-custom" >Giày thể thao nữ</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/womens-sandals" className="dropdown-item-custom">Sandals nữ</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/womens-heels" className="dropdown-item-custom">Giày cao gót nữ</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/blogs" className="nav-link-custom mx-1" style={{ outline: "none" }}>
                Tin tức
            </Nav.Link>

            <Nav.Link as={Link} to="/contact" className="nav-link-custom mx-1" style={{ outline: "none" }}>
                Liên hệ
            </Nav.Link>


        </Nav>
    );
};

export default NavMenu;