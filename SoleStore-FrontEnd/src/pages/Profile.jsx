import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Profile = ({ user, accounts, setAccounts, setUser, onLogout }) => {
  // ------------------- Địa chỉ giao hàng -------------------
  const [address, setAddress] = useState(user?.address || "");
  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user]);

  const handleUpdateAddress = () => {
    const updatedUser = { ...user, address };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

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

  // ------------------- Đổi mật khẩu -------------------
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

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
    localStorage.setItem("user", JSON.stringify(updatedUser));

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

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success", 
  });

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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
                Quản lý thông tin tài khoản của bạn
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

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
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

            <motion.div 
              className="col-span-1 bg-gradient-to-br from-cyan-900/70 to-blue-900/70 rounded-xl shadow-xl overflow-hidden border border-cyan-500/30"
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

          <motion.div 
            className="mt-8 bg-black/30 rounded-xl p-6 backdrop-blur-md border border-gray-700/30"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-4 flex items-center"
              variants={itemVariants}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Hoạt động gần đây
            </motion.h3>
            
            <div className="space-y-3">
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
            </div>
          </motion.div>
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