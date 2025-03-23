import { Outlet } from 'react-router-dom';
import Footer from './ui/Footer/Footer';
import Header from './ui/Header/Header';

const Layout = () => {
    return (
        <>
            <Header />
            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
