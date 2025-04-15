import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
  return (
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
  );
};

Notification.propTypes = {
  notification: PropTypes.shape({
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default Notification;