import { motion } from "framer-motion";
import PropTypes from "prop-types";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: {
    opacity: 0,
    y: 50,
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const OrderDetail = ({
  order,
  closeDetail,
  formatCurrency,
  formatDate,
  statusColors
}) => {
  if (!order) return null;

  const getStatusText = (status) =>
    status === "processing"
      ? "Đang xử lý"
      : status === "shipped"
      ? "Đang giao"
      : status === "delivered"
      ? "Đã giao"
      : "Đã huỷ";

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeDetail}
      />
      
      {/* Modal content */}
      <motion.div
        className="relative z-[10000] w-full max-w-3xl mx-4 my-8 max-h-[85vh] overflow-auto bg-gray-900 rounded-2xl border border-white/10 shadow-2xl"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-amber-600 to-orange-700 p-6 z-10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">
              Chi tiết đơn hàng #{order.id}
            </h3>
            <button
              onClick={closeDetail}
              className="text-white/80 hover:text-white transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-amber-100 text-sm">Ngày đặt:</div>
              <div className="text-white">{formatDate(order.date)}</div>
            </div>
            <div
              className={`px-4 py-1 rounded-full ${statusColors[order.status]} text-sm font-medium`}
            >
              {getStatusText(order.status)}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Thông tin giao hàng */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="text-amber-400 font-medium mb-3">
                Địa chỉ giao hàng
              </h4>
              <div className="text-gray-200">{order.address}</div>
              {order.notes && (
                <div className="mt-2 text-sm text-gray-400">
                  <span className="font-medium text-gray-300">
                    Ghi chú:{" "}
                  </span>
                  {order.notes}
                </div>
              )}
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <h4 className="text-amber-400 font-medium mb-3">Thanh toán</h4>
              <div className="text-gray-200">
                {order.paymentMethod === "cod"
                  ? "Thanh toán khi nhận hàng (COD)"
                  : order.paymentMethod === "bank"
                  ? "Chuyển khoản ngân hàng"
                  : order.paymentMethod === "card"
                  ? "Thẻ tín dụng/Ghi nợ"
                  : "Không xác định"}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                <span className="font-medium text-gray-300">Trạng thái: </span>
                {order.paymentStatus === "paid"
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </div>
            </div>
          </div>

          {/* Bảng sản phẩm */}
          <div className="mb-6">
            <h4 className="text-lg text-white font-medium mb-4">
              Sản phẩm đã đặt
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-left">
                    <th className="p-3 rounded-tl-lg">Sản phẩm</th>
                    <th className="p-3">Đơn giá</th>
                    <th className="p-3">Số lượng</th>
                    <th className="p-3 text-right rounded-tr-lg">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {order.items.map((item) => (
                    <tr key={item.id} className="text-gray-300">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-white rounded overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {item.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              {item.color && <span>Màu: {item.color}</span>}
                              {item.color && item.size && <span> / </span>}
                              {item.size && <span>Size: {item.size}</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{formatCurrency(item.price)}</td>
                      <td className="p-3">{item.quantity}</td>
                      <td className="p-3 text-right text-amber-400">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Thông tin thanh toán */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>{formatCurrency(order.shippingFee || 0)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Giảm giá:</span>
                  <span>-{formatCurrency(order.discount)}</span>
                </div>
              )}
              <div className="border-t border-white/10 pt-2 mt-2 flex justify-between text-lg font-bold text-white">
                <span>Tổng thanh toán:</span>
                <span className="text-amber-400">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex justify-between items-center">
            {order.status === "processing" && (
              <motion.button
                className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Huỷ đơn hàng
              </motion.button>
            )}

            <div className="flex gap-3 ml-auto">
              <motion.button
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Liên hệ hỗ trợ
              </motion.button>

              <motion.button
                onClick={closeDetail}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg text-sm"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Đóng
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

OrderDetail.propTypes = {
  order: PropTypes.object.isRequired,
  closeDetail: PropTypes.func.isRequired,
  formatCurrency: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
  statusColors: PropTypes.object.isRequired
};

export default OrderDetail;