import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../context/ContextAPI';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { orderList, saveOrderToHistory, calculateSubtotal } = useOrder();
    const navigate = useNavigate();
    const [orderStep, setOrderStep] = useState(1); // 1: Thông tin, 2: Xác nhận, 3: Hoàn tất
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const [completedOrder, setCompletedOrder] = useState(null);

    // Lấy thông tin user từ localStorage (đã đăng nhập)
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Thông tin giao hàng (auto fill nếu có user)
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');

    useEffect(() => {
        if (user) {
            setCustomerName(user.name || '');
            setPhoneNumber(user.phone || '');
            setAddress(user.address || '');
        }
    }, [user]);

    const shippingFee = 5;

    // Format số tiền theo VND
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
        }).format(amount); 
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ ...notification, show: false });
        }, 3000);
    };

    const validateInformation = () => {
        if (!customerName.trim()) {
            showNotification('Vui lòng nhập tên người nhận!', 'error');
            return false;
        }
        if (!phoneNumber.trim() || !/^\d{10,11}$/.test(phoneNumber)) {
            showNotification('Vui lòng nhập số điện thoại hợp lệ (10-11 số)!', 'error');
            return false;
        }
        if (!address.trim()) {
            showNotification('Vui lòng nhập địa chỉ nhận hàng!', 'error');
            return false;
        }
        return true;
    };

    const handleContinue = () => {
        if (validateInformation()) {
            setOrderStep(2);
        }
    };

    const handleBack = () => {
        setOrderStep(1);
    };

    const handlePlaceOrder = () => {
        // Tạo thông tin đơn hàng
        const orderDetails = {
            customerName,
            phoneNumber,
            address,
            paymentMethod,
            total: calculateSubtotal() + shippingFee,
            orderDate: new Date().toISOString(),
            userId: user?.id, // Thêm userId nếu có để lọc đơn hàng theo người dùng
        };

        // Lưu đơn hàng vào lịch sử và xóa giỏ hàng
        const savedOrder = saveOrderToHistory(orderDetails);
        setCompletedOrder(savedOrder);
        
        console.log('Đơn hàng đã lưu:', savedOrder);
        setOrderStep(3);
    };

    const handleGoHome = () => {
        navigate('/', { replace: true });
    };

    // Hiệu ứng cho container, với trì hoãn hiệu ứng con
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        }
    };

    const buttonVariants = {
        hover: { 
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 10
            }
        },
        tap: { 
            scale: 0.95
        }
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    // Nếu không có sản phẩm trong giỏ hàng và không phải bước hoàn tất
    if (orderList.length === 0 && orderStep !== 3) {
        return (
            <motion.div
                className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center relative"
                style={{
                    backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                
                <motion.div 
                    className="container text-center my-5 z-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <motion.h3 
                        className="text-white text-3xl font-bold mb-6"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Không có sản phẩm nào trong giỏ hàng!
                    </motion.h3>
                    <motion.button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Quay về trang chủ
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="min-h-screen bg-cover bg-fixed bg-center relative py-12"
            style={{
                backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Notification */}
            <AnimatePresence>
                {notification.show && (
                    <motion.div 
                        className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg ${
                            notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                        } text-white flex items-center`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ type: "spring", damping: 20 }}
                    >
                        {notification.type === 'success' ? (
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                        <p>{notification.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 z-10 relative">
                <motion.h2 
                    className="text-4xl font-bold text-white text-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Thanh toán đơn hàng
                </motion.h2>

                {/* Các bước thanh toán */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center">
                        <motion.div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                orderStep >= 1 ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gray-600'
                            }`}
                            animate={{
                                scale: orderStep === 1 ? [1, 1.1, 1] : 1
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            1
                        </motion.div>
                        <div className={`w-16 h-1 ${orderStep >= 2 ? 'bg-indigo-600' : 'bg-gray-600'}`}></div>
                        <motion.div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                orderStep >= 2 ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gray-600'
                            }`}
                            animate={{
                                scale: orderStep === 2 ? [1, 1.1, 1] : 1
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            2
                        </motion.div>
                        <div className={`w-16 h-1 ${orderStep >= 3 ? 'bg-indigo-600' : 'bg-gray-600'}`}></div>
                        <motion.div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                                orderStep >= 3 ? 'bg-gradient-to-r from-blue-600 to-indigo-700' : 'bg-gray-600'
                            }`}
                            animate={{
                                scale: orderStep === 3 ? [1, 1.1, 1] : 1
                            }}
                            transition={{ duration: 0.5 }}
                        >
                            3
                        </motion.div>
                    </div>
                </div>

                <AnimatePresence mode="wait" custom={orderStep}>
                    {orderStep === 1 && (
                        <motion.div 
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            key="step1"
                            custom={1}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Thông tin giao hàng */}
                            <motion.div 
                                className="lg:col-span-2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20">
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
                                        <h3 className="font-bold text-lg">Thông tin giao hàng</h3>
                                    </div>
                                    
                                    <div className="p-6 space-y-5">
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Họ và tên người nhận
                                            </label>
                                            <div className="relative">
                                                <motion.input
                                                    type="text"
                                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                    placeholder="Nhập tên người nhận"
                                                    value={customerName}
                                                    onChange={(e) => setCustomerName(e.target.value)}
                                                    required
                                                    whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
                                                />
                                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Số điện thoại
                                            </label>
                                            <div className="relative">
                                                <motion.input
                                                    type="tel"
                                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                    placeholder="Nhập số điện thoại"
                                                    value={phoneNumber}
                                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                                    required
                                                    whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
                                                />
                                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Địa chỉ giao hàng
                                            </label>
                                            <div className="relative">
                                                <motion.textarea
                                                    rows="3"
                                                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                                    placeholder="Nhập địa chỉ nhận hàng"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    required
                                                    whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
                                                ></motion.textarea>
                                                <span className="absolute right-3 top-6 text-white/60">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                </span>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-white text-sm font-medium mb-2">
                                                Phương thức thanh toán
                                            </label>
                                            <div className="space-y-3 mt-2">
                                                <div 
                                                    className={`flex items-center p-3 rounded-lg cursor-pointer border transition-colors ${
                                                        paymentMethod === 'cod' ? 'border-blue-500 bg-blue-900/30' : 'border-white/30 bg-white/10'
                                                    }`}
                                                    onClick={() => setPaymentMethod('cod')}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                                        paymentMethod === 'cod' ? 'border-blue-500' : 'border-white/60'
                                                    }`}>
                                                        {paymentMethod === 'cod' && (
                                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">Thanh toán khi nhận hàng (COD)</p>
                                                        <p className="text-sm text-gray-300">Thanh toán bằng tiền mặt khi nhận được hàng</p>
                                                    </div>
                                                </div>
                                                
                                                <div 
                                                    className={`flex items-center p-3 rounded-lg cursor-pointer border transition-colors ${
                                                        paymentMethod === 'bank' ? 'border-blue-500 bg-blue-900/30' : 'border-white/30 bg-white/10'
                                                    }`}
                                                    onClick={() => setPaymentMethod('bank')}
                                                >
                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                                                        paymentMethod === 'bank' ? 'border-blue-500' : 'border-white/60'
                                                    }`}>
                                                        {paymentMethod === 'bank' && (
                                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">Chuyển khoản ngân hàng</p>
                                                        <p className="text-sm text-gray-300">Chuyển khoản trước khi giao hàng</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="pt-4"
                                            variants={itemVariants}
                                        >
                                            <motion.button
                                                onClick={handleContinue}
                                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                            >
                                                Tiếp tục
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tóm tắt đơn hàng */}
                            <motion.div 
                                className="lg:col-span-1"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20 h-fit sticky top-4">
                                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4">
                                        <h3 className="font-bold text-lg">Tóm tắt đơn hàng</h3>
                                    </div>
                                    <div className="p-5 text-white">
                                        <div className="space-y-3 mb-4 max-h-60 overflow-auto pr-2">
                                            {orderList.map(item => (
                                                <div key={item.id} className="flex items-start">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-12 h-12 object-cover rounded mr-3"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium">{item.name}</p>
                                                        <div className="flex justify-between">
                                                            <p className="text-sm text-gray-300">Size: {item.size} x {item.quantity}</p>
                                                            <p>{formatCurrency(item.price * item.quantity)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Tạm tính:</span>
                                                <span>{formatCurrency(calculateSubtotal())}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Phí vận chuyển:</span>
                                                <span>{formatCurrency(shippingFee)}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t border-white/20 pt-4">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Tổng cộng:</span>
                                                <motion.span
                                                    initial={{ scale: 1 }}
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 0.5, delay: 0.5 }}
                                                >
                                                    {formatCurrency(calculateSubtotal() + shippingFee)}
                                                </motion.span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {orderStep === 2 && (
                        <motion.div 
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            key="step2"
                            custom={2}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Xác nhận thông tin */}
                            <motion.div 
                                className="lg:col-span-2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20">
                                    <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
                                        <h3 className="font-bold text-lg">Xác nhận thông tin đơn hàng</h3>
                                    </div>
                                    
                                    <div className="p-6">
                                        <motion.div 
                                            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                                            variants={containerVariants}
                                        >
                                            <motion.div 
                                                className="bg-white/5 p-4 rounded-lg border border-white/10"
                                                variants={itemVariants}
                                            >
                                                <h4 className="text-white font-medium text-lg mb-3">Thông tin người nhận</h4>
                                                <div className="space-y-2 text-gray-300">
                                                    <p><span className="text-white font-medium">Họ tên:</span> {customerName}</p>
                                                    <p><span className="text-white font-medium">Số điện thoại:</span> {phoneNumber}</p>
                                                    <p><span className="text-white font-medium">Địa chỉ:</span> {address}</p>
                                                </div>
                                            </motion.div>
                                            
                                            <motion.div 
                                                className="bg-white/5 p-4 rounded-lg border border-white/10"
                                                variants={itemVariants}
                                            >
                                                <h4 className="text-white font-medium text-lg mb-3">Phương thức thanh toán</h4>
                                                <div className="space-y-2 text-gray-300">
                                                    <p>
                                                        {paymentMethod === 'cod' 
                                                            ? 'Thanh toán khi nhận hàng (COD)' 
                                                            : 'Chuyển khoản ngân hàng'
                                                        }
                                                    </p>
                                                    {paymentMethod === 'bank' && (
                                                        <div className="bg-blue-900/30 rounded-md p-3 mt-2 border border-blue-500/30 text-sm">
                                                            <p className="text-blue-300 font-medium">Thông tin chuyển khoản:</p>
                                                            <p className="text-white">Ngân hàng: Vietcombank</p>
                                                            <p className="text-white">Số tài khoản: 1234567890</p>
                                                            <p className="text-white">Chủ tài khoản: CÔNG TY TNHH SHOES</p>
                                                            <p className="text-white mt-2">Nội dung: Thanh toán đơn hàng {new Date().getTime().toString().slice(-8)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="mb-6"
                                            variants={itemVariants}
                                        >
                                            <h4 className="text-white font-medium text-lg mb-3">Danh sách sản phẩm</h4>
                                            <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                                                <div className="divide-y divide-gray-700/30">
                                                    {orderList.map(item => (
                                                        <div key={item.id} className="flex items-center p-3">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name} 
                                                                className="w-12 h-12 object-cover rounded mr-3"
                                                            />
                                                            <div className="flex-1">
                                                                <p className="text-white">{item.name}</p>
                                                                <p className="text-sm text-gray-300">Size: {item.size}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-white">{item.quantity} x {formatCurrency(item.price)}</p>
                                                                <p className="text-yellow-300 font-medium">{formatCurrency(item.price * item.quantity)}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="flex flex-col md:flex-row space-y-3 md:space-y-0 space-x-0 md:space-x-3"
                                            variants={itemVariants}
                                        >
                                            <motion.button
                                                onClick={handleBack}
                                                className="py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center"
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                                </svg>
                                                Quay lại
                                            </motion.button>
                                            <motion.button
                                                onClick={handlePlaceOrder}
                                                className="flex-1 py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                                variants={buttonVariants}
                                                whileHover="hover"
                                                whileTap="tap"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Xác nhận đặt hàng
                                            </motion.button>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Tóm tắt đơn hàng */}
                            <motion.div 
                                className="lg:col-span-1"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20 h-fit sticky top-4">
                                    <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4">
                                        <h3 className="font-bold text-lg">Tổng thanh toán</h3>
                                    </div>
                                    <div className="p-5 text-white">
                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Tạm tính ({orderList.length} sản phẩm):</span>
                                                <span>{formatCurrency(calculateSubtotal())}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-300">Phí vận chuyển:</span>
                                                <span>{formatCurrency(shippingFee)}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t border-white/20 pt-4">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Tổng cộng:</span>
                                                <motion.span
                                                    className="text-yellow-300"
                                                    initial={{ scale: 1 }}
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 0.5, delay: 0.5 }}
                                                >
                                                    {formatCurrency(calculateSubtotal() + shippingFee)}
                                                </motion.span>
                                            </div>
                                            <p className="text-sm text-gray-300 mt-2">
                                                Bằng việc đặt hàng, bạn đồng ý với điều khoản dịch vụ và chính sách của chúng tôi.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {orderStep === 3 && (
                        <motion.div 
                            className="grid grid-cols-1 gap-8 max-w-2xl mx-auto"
                            key="step3"
                            custom={3}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <motion.div 
                                className="backdrop-blur-md bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20 text-center"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4">
                                    <h3 className="font-bold text-lg">Đặt hàng thành công</h3>
                                </div>
                                
                                <div className="p-8 flex flex-col items-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: [0, 1.2, 1] }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="w-20 h-20 rounded-full bg-green-600/30 flex items-center justify-center mb-4"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </motion.div>

                                    <motion.h4 
                                        className="text-2xl font-bold text-white mb-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        Cảm ơn bạn đã đặt hàng!
                                    </motion.h4>
                                    
                                    <motion.p 
                                        className="text-gray-300 mb-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
                                    </motion.p>
                                    
                                    {completedOrder && (
                                        <motion.div
                                            className="bg-white/10 p-4 rounded-lg mb-6 text-left border border-white/20"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                        >
                                            <p className="text-white text-sm mb-1">Mã đơn hàng: <span className="font-medium">{completedOrder.id}</span></p>
                                            <p className="text-white text-sm">Bạn có thể theo dõi đơn hàng trong mục "Đơn hàng của tôi" trên trang cá nhân.</p>
                                        </motion.div>
                                    )}
                                    
                                    <div className="flex flex-col md:flex-row gap-4 w-full">
                                        <motion.button
                                            onClick={() => navigate('/account')}
                                            className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Xem đơn hàng
                                        </motion.button>
                                        
                                        <motion.button
                                            onClick={handleGoHome}
                                            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.9 }}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
                                            </svg>
                                            Quay về trang chủ
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Checkout;