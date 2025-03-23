import 'react';
import AllProducts from '../components/ui/ContentHome/AllProducts';
import BlogList from '../components/ui/ContentHome/BlogList';
import HeroSection from '../components/ui/ContentHome/HeroSection';
import HomeBanner from '../components/ui/ContentHome/HomeBanner';
import NewArrivals from '../components/ui/ContentHome/NewArrivals';
import ShopByCategory from '../components/ui/ContentHome/ShopByCategory';


const Home = () => {
    return (
        <>
            <HeroSection />
            <ShopByCategory />
            <NewArrivals />
            <HomeBanner />
            <AllProducts />
            <BlogList />
        </>
    );
};

export default Home;
