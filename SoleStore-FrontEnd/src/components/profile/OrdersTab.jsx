import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const OrdersTab = ({ orderHistory, formatCurrency, formatDate, contentVariants, containerVariants, itemVariants, buttonVariants, statusColors }) => {
  return (
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
          {orderHistory.map((order) => (
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
  );
};

OrdersTab.propTypes = {
  orderHistory: PropTypes.array.isRequired,
  formatCurrency: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  contentVariants: PropTypes.object.isRequired,
  containerVariants: PropTypes.object.isRequired,
  itemVariants: PropTypes.object.isRequired,
  buttonVariants: PropTypes.object.isRequired,
  statusColors: PropTypes.object.isRequired
};

export default OrdersTab;