import { motion } from "framer-motion";
import PropTypes from "prop-types";

const ProfileHeader = ({ user, onLogout, containerVariants, itemVariants, buttonVariants }) => {
  return (
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
  );
};

ProfileHeader.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  containerVariants: PropTypes.object.isRequired,
  itemVariants: PropTypes.object.isRequired,
  buttonVariants: PropTypes.object.isRequired,
};

export default ProfileHeader;