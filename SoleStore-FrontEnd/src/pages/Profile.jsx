import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Profile = ({ user, accounts, setAccounts, setUser, onLogout }) => {
  // ----------------- State Management -----------------
  const [address, setAddress] = useState(user?.address || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // profile, orders, settings
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", 
  });

  // Mock order history (in a real app, this would come from API/localStorage)
  const orderHistory = (() => {
    const savedOrders = localStorage.getItem('soleStore_orderHistory');
    return savedOrders ? JSON.parse(savedOrders) : [
      {
        id: "ORD-20250412-001",
        date: "2025-04-10T10:30:00",
        status: "delivered",
        total: 2850000,
        items: [
          {
            id: 101, 
            name: "Giày Thể Thao Nike Air Force 1", 
            price: 1950000, 
            quantity: 1,
            image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/350e7f3a-979a-402b-9396-a8a998dd76ab/air-force-1-07-shoes-xDrQrZ.png"
          }
        ],
        address: "123 Nguyễn Văn Cừ, Quận 5, TP.HCM",
      },
      {
        id: "ORD-20250325-002",
        date: "2025-03-25T15:45:00",
        status: "processing",
        total: 4150000,
        items: [
          {
            id: 102, 
            name: "Giày Adidas Ultraboost 22", 
            price: 3150000, 
            quantity: 1,
            image: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Giay_UltraBoost_22_DJen_GZ0127_01_standard.jpg"
          },
          {
            id: 103, 
            name: "Vớ Thể Thao Nike (3 đôi)", 
            price: 350000, 
            quantity: 1,
            image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/98f9ac71-ab3d-4d38-ba34-ea3511cc78b4/everyday-plus-cushioned-training-ankle-socks-6-pairs-fxLzVx.png"
          }
        ],
        address: "456 Lê Hồng Phong, Quận 10, TP.HCM",
      }
    ];
  })();

  // ------------- Side Effects -------------
  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user]);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // ------------- Event Handlers -------------
  const handleUpdateAddress = () => {
    if (!address.trim()) {
      setNotification({
        show: true,
        message: "Vui lòng nhập địa chỉ hợp lệ!",
        type: "error",
      });
      return;
    }
    
    const updatedUser = { ...user, address };
    setUser(updatedUser);

    const updatedAccounts = accounts.map((acc) =>
      acc.id === updatedUser.id ? updatedUser : acc
    );
    setAccounts(updatedAccounts);

    setNotification({
      show: true,
      message: "Địa chỉ đã được cập nhật thành công!",
      type: "success",
    });
  };

  const handleChangePassword = () => {
    if (!currentPassword) {
      setNotification({
        show: true,
        message: "Vui lòng nhập mật khẩu hiện tại",
        type: "error",
      });
      return;
    }
    
    if (!newPassword) {
      setNotification({
        show: true,
        message: "Vui lòng nhập mật khẩu mới",
        type: "error",
      });
      return;
    }

    if (currentPassword !== user.password) {
      setNotification({
        show: true,
        message: "Mật khẩu hiện tại không đúng!",
        type: "error",
      });
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    setUser(updatedUser);

    const updatedAccounts = accounts.map((acc) =>
      acc.id === updatedUser.id ? updatedUser : acc
    );
    setAccounts(updatedAccounts);

    setNotification({
      show: true,
      message: "Đổi mật khẩu thành công!",
      type: "success",
    });
    setCurrentPassword("");
    setNewPassword("");
  };

  // ------------- Animation Variants -------------
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

  const cardVariants = {
    hover: {
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    }
  };

  const tabVariants = {
    inactive: { 
      opacity: 0.7,
      y: 0
    },
    active: { 
      opacity: 1,
      y: 0,
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { 
        duration: 0.2
      }
    }
  };

  // Status color mapping for order status badges
  const statusColors = {
    processing: "bg-yellow-500/80 text-white",
    shipped: "bg-blue-500/80 text-white",
    delivered: "bg-green-500/80 text-white",
    cancelled: "bg-red-500/80 text-white",
  };

  // Format currency in VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
      style: 'currency', 
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(amount); 
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  return (
    <motion.div
      className="min-h-screen bg-cover bg-fixed bg-center py-12"
      style={{
        backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={`fixed top-5 right-5 z-50 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === "success" ? "bg-green-600" : "bg-red-600"
        } text-white`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: notification.show ? 1 : 0, 
          x: notification.show ? 0 : 100 
        }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="flex items-center">
          {notification.type === "success" ? (
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
          <p>{notification.message}</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-6xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20, 
            delay: 0.2 
          }}
        >
          {/* Header with Welcome and Logout */}
          <motion.div 
            className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div>
              <motion.h2 
                className="text-3xl font-bold text-white mb-2"
                variants={itemVariants}
              >
                Xin chào, {user.name}!
              </motion.h2>
              <motion.p 
                className="text-gray-300"
                variants={itemVariants}
              >
                Quản lý thông tin tài khoản và đơn hàng của bạn
              </motion.p>
            </div>
            <motion.button
              onClick={onLogout}
              className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-medium rounded-lg shadow-lg transition duration-300 flex items-center justify-center space-x-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span>Đăng xuất</span>
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </motion.button>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div 
            className="flex flex-wrap mb-8 gap-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 rounded-xl text-white font-medium flex items-center space-x-2 transition-all ${
                activeTab === "profile" 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg shadow-blue-900/30" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              variants={tabVariants}
              animate={activeTab === "profile" ? "active" : "inactive"}
              whileHover="hover"
            >
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
              <span>Thông tin cá nhân</span>
            </motion.button>

            <motion.button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 rounded-xl text-white font-medium flex items-center space-x-2 transition-all ${
                activeTab === "orders" 
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-orange-900/30" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              variants={tabVariants}
              animate={activeTab === "orders" ? "active" : "inactive"}
              whileHover="hover"
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
                />
              </svg>
              <span>Đơn hàng của tôi</span>
            </motion.button>

            <motion.button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-3 rounded-xl text-white font-medium flex items-center space-x-2 transition-all ${
                activeTab === "settings" 
                  ? "bg-gradient-to-r from-green-600 to-emerald-700 shadow-lg shadow-green-900/30" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              variants={tabVariants}
              animate={activeTab === "settings" ? "active" : "inactive"}
              whileHover="hover"
            >
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                />
              </svg>
              <span>Tài khoản & Bảo mật</span>
            </motion.button>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information Card */}
                  <motion.div 
                    className="col-span-1 bg-gradient-to-br from-blue-900/70 to-indigo-900/70 rounded-xl shadow-xl overflow-hidden border border-blue-500/30"
                    variants={itemVariants}
                    whileHover={cardVariants.hover}
                  >
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5">
                      <div className="flex items-center space-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
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
                        <h3 className="font-bold text-lg">Thông tin cá nhân</h3>
                      </div>
                    </div>
                    <div className="p-5 text-white">
                      <motion.div 
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div 
                          className="flex items-start" 
                          variants={itemVariants}
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
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
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm">Họ tên</p>
                            <p className="font-medium">{user.name}</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="flex items-start"
                          variants={itemVariants}
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm">Email</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="flex items-start"
                          variants={itemVariants}
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
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
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm">Số điện thoại</p>
                            <p className="font-medium">{user.phone}</p>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="flex items-start"
                          variants={itemVariants}
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center mr-3 mt-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
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
                          </div>
                          <div>
                            <p className="text-gray-300 text-sm">Địa chỉ giao hàng</p>
                            <p className="font-medium">{user.address || "Chưa cập nhật"}</p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="mt-6"
                          variants={itemVariants}
                        >
                          <div className="text-xs font-medium uppercase tracking-wider text-blue-300 mb-1">Thông tin tài khoản</div>
                          <div className="w-full bg-blue-900/30 rounded-md p-3 backdrop-blur-sm">
                            <div className="flex justify-between items-center">
                              <div className="text-white">Trạng thái</div>
                              <div className="bg-green-500/20 text-green-400 text-sm px-2 py-0.5 rounded-full border border-green-500/30 flex items-center">
                                <div className="w-2 h-2 rounded-full bg-green-400 mr-1.5"></div>
                                Đang hoạt động
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Activity Card */}
                  <motion.div 
                    className="col-span-1 bg-gradient-to-br from-purple-900/70 to-indigo-900/70 rounded-xl shadow-xl overflow-hidden border border-purple-500/30"
                    variants={itemVariants}
                    whileHover={cardVariants.hover}
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-5">
                      <div className="flex items-center space-x-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <h3 className="font-bold text-lg">Hoạt động gần đây</h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <motion.div 
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <motion.div 
                          className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                          variants={itemVariants}
                        >
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">Đăng nhập thành công</p>
                            <p className="text-gray-400 text-xs">Hôm nay, {new Date().toLocaleTimeString()}</p>
                          </div>
                          <div className="text-gray-400 text-xs">Vừa xong</div>
                        </motion.div>
                        
                        <motion.div 
                          className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                          variants={itemVariants}
                        >
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">Cập nhật thông tin tài khoản</p>
                            <p className="text-gray-400 text-xs">{new Date().toLocaleDateString()}</p>
                          </div>
                          <div className="text-gray-400 text-xs">1 ngày trước</div>
                        </motion.div>

                        <motion.div 
                          className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                          variants={itemVariants}
                        >
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium">Đặt hàng thành công</p>
                            <p className="text-gray-400 text-xs">Đơn hàng #{orderHistory[0]?.id || "ORD-20250412-001"}</p>
                          </div>
                          <div className="text-gray-400 text-xs">2 ngày trước</div>
                        </motion.div>
                      </motion.div>

                      <motion.div 
                        className="mt-6"
                        variants={itemVariants}
                      >
                        <Link 
                          to="#" 
                          className="text-center block w-full py-2 px-3 rounded-lg border border-purple-500/30 text-purple-300 hover:bg-purple-500/20 transition-colors"
                          onClick={() => setActiveTab("orders")}
                        >
                          Xem tất cả hoạt động
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Shipping Address Card */}
                <motion.div 
                  className="mt-8 bg-gradient-to-br from-cyan-900/70 to-indigo-900/70 rounded-xl shadow-xl overflow-hidden border border-cyan-500/30"
                  variants={itemVariants}
                  whileHover={cardVariants.hover}
                >
                  <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white p-5">
                    <div className="flex items-center space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                      <h3 className="font-bold text-lg">Địa chỉ giao hàng</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <motion.div 
                      className="mb-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.label 
                        className="block text-white text-sm font-medium mb-2"
                        variants={itemVariants}
                      >
                        Địa chỉ của bạn
                      </motion.label>
                      <motion.textarea
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200"
                        placeholder="Nhập địa chỉ giao hàng của bạn"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="3"
                        variants={itemVariants}
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(6, 182, 212, 0.5)" }}
                      ></motion.textarea>
                    </motion.div>
                    <motion.button
                      onClick={handleUpdateAddress}
                      className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        />
                      </svg>
                      Cập nhật địa chỉ
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                key="orders"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 flex items-center"
                  variants={itemVariants}
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Đơn hàng của tôi
                </motion.h3>

                {orderHistory.length === 0 ? (
                  <motion.div
                    className="bg-white/5 backdrop-blur-md rounded-xl p-10 text-center text-gray-300 border border-white/10"
                    variants={itemVariants}
                  >
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-xl font-medium mb-2">Không có đơn hàng nào</p>
                    <p className="mb-6 text-gray-400">Bạn chưa có đơn hàng nào. Hãy mua sắm để tận hưởng sản phẩm của chúng tôi!</p>
                    <Link
                      to="/"
                      className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium shadow-lg hover:shadow-orange-900/30 transition-all"
                    >
                      Tiếp tục mua sắm
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                    {orderHistory.map((order, index) => (
                      <motion.div
                        key={order.id}
                        className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-white/10"
                        variants={itemVariants}
                        whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      >
                        <div className="bg-white/5 p-5 flex flex-wrap justify-between items-center gap-3">
                          <div>
                            <div className="text-gray-300 text-sm mb-1">Mã đơn hàng:</div>
                            <div className="text-white font-medium">{order.id}</div>
                          </div>
                          <div>
                            <div className="text-gray-300 text-sm mb-1">Ngày đặt:</div>
                            <div className="text-white">{formatDate(order.date)}</div>
                          </div>
                          <div>
                            <div className="text-gray-300 text-sm mb-1">Tổng tiền:</div>
                            <div className="text-amber-300 font-bold">{formatCurrency(order.total)}</div>
                          </div>
                          <div>
                            <div className="text-gray-300 text-sm mb-1">Trạng thái:</div>
                            <div className={`px-3 py-1 rounded-full ${statusColors[order.status]} text-xs font-medium capitalize`}>
                              {order.status === "processing" ? "Đang xử lý" : 
                               order.status === "shipped" ? "Đang giao" :
                               order.status === "delivered" ? "Đã giao" : "Đã huỷ"}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-5 border-t border-white/10">
                          <div className="mb-4">
                            <div className="text-gray-300 text-sm mb-2">Sản phẩm:</div>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                  <div className="w-16 h-16 bg-white rounded overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-white font-medium truncate">{item.name}</div>
                                    <div className="text-gray-300 text-sm">SL: {item.quantity}</div>
                                    <div className="text-amber-300">{formatCurrency(item.price)}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 justify-between items-center pt-4 border-t border-white/10">
                            <div>
                              <div className="text-gray-300 text-sm mb-1">Địa chỉ giao hàng:</div>
                              <div className="text-white">{order.address}</div>
                            </div>
                            <motion.button
                              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded font-medium"
                              variants={buttonVariants}
                              whileHover="hover"
                              whileTap="tap"
                            >
                              Xem chi tiết
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Password Change Card */}
                <motion.div 
                  className="col-span-1 bg-gradient-to-br from-green-900/70 to-emerald-900/70 rounded-xl shadow-xl overflow-hidden border border-green-500/30"
                  variants={itemVariants}
                  whileHover={cardVariants.hover}
                >
                  <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-5">
                    <div className="flex items-center space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                      <h3 className="font-bold text-lg">Đổi mật khẩu</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={itemVariants}>
                        <label className="block text-white text-sm font-medium mb-2">
                          Mật khẩu hiện tại
                        </label>
                        <motion.input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                          placeholder="Nhập mật khẩu hiện tại"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(52, 211, 153, 0.5)" }}
                        />
                      </motion.div>
                      <motion.div variants={itemVariants}>
                        <label className="block text-white text-sm font-medium mb-2">
                          Mật khẩu mới
                        </label>
                        <motion.input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                          placeholder="Nhập mật khẩu mới"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(52, 211, 153, 0.5)" }}
                        />
                      </motion.div>
                      <motion.button
                        onClick={handleChangePassword}
                        className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                          />
                        </svg>
                        Lưu thay đổi
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Account Settings Card */}
                <motion.div 
                  className="col-span-1 bg-gradient-to-br from-amber-900/70 to-orange-900/70 rounded-xl shadow-xl overflow-hidden border border-amber-500/30"
                  variants={itemVariants}
                  whileHover={cardVariants.hover}
                >
                  <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-5">
                    <div className="flex items-center space-x-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <h3 className="font-bold text-lg">Thiết lập tài khoản</h3>
                    </div>
                  </div>
                  <div className="p-5 text-white">
                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Thông báo đơn hàng</p>
                          <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" defaultChecked className="opacity-0 w-0 h-0" />
                            <span className="absolute cursor-pointer inset-0 rounded-full bg-gray-600 transition-all before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all checked:before:transform checked:before:translate-x-6 checked:bg-amber-500"></span>
                          </label>
                        </div>
                        <p className="text-sm text-gray-300">Nhận thông báo khi có cập nhật về đơn hàng</p>
                      </motion.div>
                      
                      <motion.div className="space-y-2" variants={itemVariants}>
                        <div className="flex justify-between items-center">
                          <p className="font-medium">Email khuyến mãi</p>
                          <label className="relative inline-block w-12 h-6">
                            <input type="checkbox" className="opacity-0 w-0 h-0" />
                            <span className="absolute cursor-pointer inset-0 rounded-full bg-gray-600 transition-all before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all checked:before:transform checked:before:translate-x-6 checked:bg-amber-500"></span>
                          </label>
                        </div>
                        <p className="text-sm text-gray-300">Nhận email về khuyến mãi và sản phẩm mới</p>
                      </motion.div>
                      
                      <motion.div className="pt-4 mt-4 border-t border-white/10" variants={itemVariants}>
                        <h4 className="font-medium mb-3">Xóa tài khoản</h4>
                        <p className="text-sm text-gray-300 mb-4">
                          Cảnh báo: Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                        </p>
                        <motion.button
                          className="px-4 py-2 bg-white/10 hover:bg-red-500/30 border border-red-500/30 text-red-400 hover:text-red-200 rounded-lg transition-colors"
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Xóa tài khoản
                        </motion.button>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  setAccounts: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Profile;