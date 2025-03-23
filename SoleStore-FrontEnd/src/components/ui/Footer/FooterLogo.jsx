import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';

const FooterLogo = () => {
    return (
        <div className="mb-8">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600 mr-3 shadow-lg">
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="text-white"
                    >
                        <path d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <h5 className="text-2xl font-bold">SoleStyle<span className="text-amber-400">VN</span></h5>
            </div>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Chúng tôi cung cấp các sản phẩm giày chất lượng cao cho mọi phong cách và mọi dịp. 
                Cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng với nhiều mẫu mã đa dạng, 
                từ giày thể thao đến giày thời trang.
            </p>

            <div className="mb-6">
                <h6 className="text-white font-semibold mb-4 text-lg relative inline-block pb-2">
                    Kết nối với chúng tôi
                    <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></span>
                </h6>
                <div className="flex space-x-3">
                    <a href="#" className="social-icon">
                        <FaFacebookF />
                    </a>
                    <a href="#" className="social-icon">
                        <FaInstagram />
                    </a>
                    <a href="#" className="social-icon">
                        <FaTwitter />
                    </a>
                    <a href="#" className="social-icon">
                        <FaYoutube />
                    </a>
                    <a href="#" className="social-icon">
                        <FaTiktok />
                    </a>
                </div>
            </div>

            <div>
                <h6 className="text-white font-semibold mb-4 text-lg relative inline-block pb-2">
                    Tải ứng dụng
                    <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></span>
                </h6>
                <div className="flex space-x-3">
                    <a href="#" className="transition-transform duration-300 hover:-translate-y-1">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png" 
                            alt="App Store" 
                            className="h-9 rounded-md"
                        />
                    </a>
                    <a href="#" className="transition-transform duration-300 hover:-translate-y-1">
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1024px-Google_Play_Store_badge_EN.svg.png" 
                            alt="Google Play" 
                            className="h-9 rounded-md"
                        />
                    </a>
                </div>
            </div>

            <style>{`
                .social-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.1);
                    color: white;
                    transition: all 0.3s ease;
                }
                
                .social-icon:hover {
                    background: linear-gradient(135deg, #f59e0b, #ea580c);
                    color: white;
                    transform: translateY(-3px);
                    box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
                }
            `}</style>
        </div>
    );
};

export default FooterLogo;