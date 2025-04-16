import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrder } from '../context/ContextAPI';

const CartPage = () => {
    const { orderList, removeFromCart, updateQuantity } = useOrder();

    // Tạo độ mờ khi xoá sản phẩm khỏi giỏ hàng
    const [removingId, setRemovingId] = useState(null);

    const handleQuantityChange = (id, size, quantity) => {
        const updatedQuantity = parseInt(quantity);
        if (updatedQuantity < 1 || isNaN(updatedQuantity)) return;

        updateQuantity(id, size, updatedQuantity);
    };

    const handleRemoveItem = (id) => {
        setRemovingId(id);
        // Delay để animation hoàn thành
        setTimeout(() => {
            removeFromCart(id);
            setRemovingId(null);
        }, 300);
    };

    const calculateSubtotal = () => {
        return orderList.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    // Format số tiền theo VND
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            // Thời gian chuyển trạng thái
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                // Các phần tử con bên trong container sẽ xuất hiện lần lượt, cách nhau 0.1 giây
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
        },
        exit: {
            x: -100,
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    const buttonVariants = {
        hover: {
            scale: 1.05,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            transition: {
                type: "spring",
                // Độ cứng của hiệu ứng đàn hồi
                stiffness: 400,
                // Độ giảm chấn
                damping: 10
            }
        },
        tap: {
            // Giảm kích thước nút xuống 95% so với kích thước ban đầu
            scale: 0.95
        }
    };

    // Trường hợp giỏ hàng trống
    if (orderList.length === 0) {
        return (
            <motion.div
                className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center relative"
                style={{
                    backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
                }}
                // Khi component mới được render, bắt đầu với độ mờ 0
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // Thời gian chuyển đổi animation là 0.8 giây.
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
                    <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link
                            to="/"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Quay về trang chủ
                        </Link>
                    </motion.div>
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

            <div className="container mx-auto px-4 z-10 relative">
                <motion.h2
                    className="text-4xl font-bold text-white text-center mb-8"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Giỏ hàng của bạn
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Danh sách sản phẩm */}
                    <motion.div
                        className="lg:col-span-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="backdrop-blur-md bg-white/10 rounded-xl shadow-2xl overflow-hidden border border-white/20">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
                                <h3 className="font-bold text-lg">Sản phẩm đã chọn</h3>
                            </div>

                            <div className="divide-y divide-gray-200/20">
                                <AnimatePresence>
                                    {orderList.map(item => (
                                        <motion.div
                                            key={item.id}
                                            className={`flex flex-col md:flex-row items-start md:items-center p-4 ${item.id === removingId ? 'opacity-50' : ''}`}
                                            variants={itemVariants}
                                            exit="exit"
                                            layout
                                        >
                                            <div className="flex items-center flex-1 w-full md:w-auto mb-4 md:mb-0">
                                                <div className="bg-white rounded-lg p-1 mr-4 flex-shrink-0">
                                                    <motion.img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-white text-lg">{item.name}</h4>
                                                    <p className="text-gray-300 text-sm">Size: {item.size}</p>
                                                    <p className="text-white font-medium mt-1">{formatCurrency(item.price)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4 w-full md:w-auto">
                                                <div className="relative">
                                                    <div className="flex items-center bg-white/20 rounded-lg border border-white/30 overflow-hidden">
                                                        <button
                                                            className="px-3 py-1 text-white hover:bg-white/10 transition-colors"
                                                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                            className="w-12 text-center bg-transparent text-white border-none focus:outline-none focus:ring-0"
                                                        />
                                                        <button
                                                            className="px-3 py-1 text-white hover:bg-white/10 transition-colors"
                                                            onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>

                                                <motion.button
                                                    className="p-2 bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg transition-colors"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
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
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Tạm tính:</span>
                                        <span>{formatCurrency(calculateSubtotal())}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Phí vận chuyển:</span>
                                        <span>{formatCurrency(50000)}</span>
                                    </div>
                                </div>

                                <div className="border-t border-white/20 pt-4 mb-6">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Tổng cộng:</span>
                                        <motion.span
                                            initial={{ scale: 1 }}
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                        >
                                            {formatCurrency(calculateSubtotal() + 50000)}
                                        </motion.span>
                                    </div>
                                </div>

                                <motion.div
                                    variants={buttonVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                >
                                    <Link
                                        to="/checkout"
                                        className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                        </svg>
                                        Tiến hành thanh toán
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default CartPage;