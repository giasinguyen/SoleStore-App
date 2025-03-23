import FooterLogo from './FooterLogo';
import FooterColumn from './FooterColumn';
import FooterBottom from './FooterBottom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-95"></div>
            
            <div 
                className="absolute inset-0 opacity-10 bg-cover bg-center bg-fixed"
                style={{ 
                    backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')` 
                }}
            ></div>
            
            {/* Hiệu ứng blob làm nền */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl -translate-y-1/3 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/3"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
                    <div className="lg:col-span-4">
                        <FooterLogo />
                    </div>
                    
                    <div className="lg:col-span-2 md:col-span-1">
                        <FooterColumn
                            title="Sản phẩm"
                            links={[
                                { label: "Giày thể thao nam", href: "#" },
                                { label: "Giày thể thao nữ", href: "#" },
                                { label: "Giày chạy bộ", href: "#" },
                                { label: "Giày bóng rổ", href: "#" },
                                { label: "Giày thời trang", href: "#" },
                                { label: "Phụ kiện giày", href: "#" },
                            ]}
                        />
                    </div>
                    
                    <div className="lg:col-span-2 md:col-span-1">
                        <FooterColumn
                            title="Thương hiệu"
                            links={[
                                { label: "Nike", href: "#" },
                                { label: "Adidas", href: "#" },
                                { label: "Puma", href: "#" },
                                { label: "New Balance", href: "#" },
                                { label: "Converse", href: "#" },
                                { label: "Vans", href: "#" },
                            ]}
                        />
                    </div>
                    
                    <div className="lg:col-span-2 md:col-span-1">
                        <FooterColumn
                            title="Hỗ trợ"
                            links={[
                                { label: "Hướng dẫn mua hàng", href: "#" },
                                { label: "Chính sách vận chuyển", href: "#" },
                                { label: "Đổi trả & bảo hành", href: "#" },
                                { label: "Theo dõi đơn hàng", href: "#" },
                                { label: "Hướng dẫn chọn size", href: "#" },
                                { label: "Câu hỏi thường gặp", href: "#" },
                            ]}
                        />
                    </div>
                    
                    <div className="lg:col-span-2 md:col-span-1">
                        <div className="mb-6">
                            <h6 className="text-white font-semibold mb-5 text-lg relative inline-block pb-2">
                                Liên hệ với chúng tôi
                                <span className="absolute left-0 bottom-0 w-10 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></span>
                            </h6>
                            <ul className="space-y-3">
                                <li className="flex items-start text-sm text-gray-300">
                                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </span>
                                    <span>12 Nguyễn Văn Bảo, Phương 1, Quận Gò Vấp, TP.HCM</span>
                                </li>
                                <li className="flex items-start text-sm text-gray-300">
                                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </span>
                                    <span>(028) 3822 9999</span>
                                </li>
                                <li className="flex items-start text-sm text-gray-300">
                                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    <span>Nhom14@solestyle.vn</span>
                                </li>
                                <li className="flex items-start text-sm text-gray-300">
                                    <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <span>8:00 - 21:00, Thứ 2 - Chủ nhật</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="mb-12 py-6 px-6 rounded-2xl bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        <div className="md:col-span-1">
                            <h4 className="text-xl font-bold text-white mb-2">Đăng ký nhận tin</h4>
                            <p className="text-gray-300 text-sm">Nhận thông tin về sản phẩm mới và khuyến mãi đặc biệt</p>
                        </div>
                        <div className="md:col-span-2">
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="Nhập email của bạn" 
                                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-l-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                />
                                <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium px-5 py-2 rounded-r-lg transition-all duration-200">
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <FooterBottom />
            </div>
        </footer>
    );
};

export default Footer;