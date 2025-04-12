import 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import Layout from './components/Layout';
import BlogDetail from "./components/ui/Blogs/BlogDetail";
import ProductDetail from "./components/ui/Products/ProductDetail";
import AccountPage from './pages/Account';
import Blog from './pages/Blog';
import CartPage from './pages/Cart';
import Checkout from "./pages/Checkout";
import Contact from './pages/Contact';
import Home from './pages/Home';
import MensLeather from './pages/MensLeather';
import MensSandals from './pages/MensSandals';
import MensSports from './pages/MensSports';
import WomensHeels from './pages/WomensHeels';
import WomensSandals from './pages/WomensSandals';
import WomensSports from './pages/WomensSports';

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        {/* Route cha */}
        <Route path="/" element={<Layout />}>
          {/* Các route con */}
          <Route index element={<Home />} />
          <Route path="mens-sports" element={<MensSports />} />
          <Route path="mens-sandals" element={<MensSandals />} />
          <Route path="mens-leather" element={<MensLeather />} />
          <Route path="womens-sports" element={<WomensSports />} />
          <Route path="womens-sandals" element={<WomensSandals />} />
          <Route path="womens-heels" element={<WomensHeels />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path='blogs/:blogId' element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
