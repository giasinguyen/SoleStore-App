import { motion } from "framer-motion";
import PropTypes from "prop-types";

const SettingsTab = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  handleChangePassword,
  contentVariants,
  containerVariants,
  itemVariants,
  buttonVariants,
  cardVariants
}) => {
  return (
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
  );
};

SettingsTab.propTypes = {
  currentPassword: PropTypes.string.isRequired,
  setCurrentPassword: PropTypes.func.isRequired,
  newPassword: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  contentVariants: PropTypes.object.isRequired,
  containerVariants: PropTypes.object.isRequired,
  itemVariants: PropTypes.object.isRequired,
  buttonVariants: PropTypes.object.isRequired,
  cardVariants: PropTypes.object.isRequired
};

export default SettingsTab;