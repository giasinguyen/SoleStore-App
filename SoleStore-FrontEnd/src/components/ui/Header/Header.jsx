import { useState, useEffect } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import AccountIcon from './AccountIcon';
import CartIcon from './CartIcon';
import Logo from './Logo';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar 
            expand="lg" 
            className={`header-navbar py-2 ${scrolled ? 'scrolled' : ''}`}
            fixed="top"
        >
            <Container>
                <Logo />
                <Navbar.Toggle aria-controls="main-navbar" className="border-0">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="main-navbar" className="justify-content-between">
                    <NavMenu />
                    <div className="d-flex align-items-center mt-3 mt-lg-0">
                        <SearchBar />
                        <CartIcon />
                        <AccountIcon />
                    </div>
                </Navbar.Collapse>
            </Container>

            <style>{`
                .header-navbar {
                    background: linear-gradient(to right, rgba(31, 41, 55, 0.98), rgba(17, 24, 39, 0.98));
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                }
                
                .header-navbar.scrolled {
                    padding-top: 0.5rem !important;
                    padding-bottom: 0.5rem !important;
                    background: linear-gradient(to right, rgba(31, 41, 55, 0.98), rgba(17, 24, 39, 0.98));
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                }
                
                .navbar-toggler:focus {
                    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.5);
                }
                
                .navbar-toggler-icon {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
                }
            `}</style>
        </Navbar>
    );
};

export default Header;