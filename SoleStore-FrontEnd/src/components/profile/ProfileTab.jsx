import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileTab = ({ 
  user, 
  address, 
  setAddress, 
  orderHistory,
  handleUpdateAddress,
  contentVariants, 
  containerVariants, 
  itemVariants, 
  buttonVariants,
  cardVariants, 
  setActiveTab 
}) => {
  return (
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
  );
};

ProfileTab.propTypes = {
  user: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  orderHistory: PropTypes.array.isRequired,
  handleUpdateAddress: PropTypes.func.isRequired,
  contentVariants: PropTypes.object.isRequired,
  containerVariants: PropTypes.object.isRequired,
  itemVariants: PropTypes.object.isRequired,
  buttonVariants: PropTypes.object.isRequired,
  cardVariants: PropTypes.object.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default ProfileTab;