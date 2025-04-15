import { motion } from "framer-motion";
import PropTypes from "prop-types";

const TabNavigation = ({ activeTab, setActiveTab, containerVariants, tabVariants }) => {
  return (
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
  );
};

TabNavigation.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  containerVariants: PropTypes.object.isRequired,
  tabVariants: PropTypes.object.isRequired,
};

export default TabNavigation;