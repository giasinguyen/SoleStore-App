import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { useOrder } from "../context/ContextAPI";

// Import các component con đã tách riêng
import Notification from "../components/profile/Notification";
import ProfileHeader from "../components/profile/ProfileHeader";
import TabNavigation from "../components/profile/TabNavigation";
import ProfileTab from "../components/profile/ProfileTab";
import OrdersTab from "../components/profile/OrdersTab";
import SettingsTab from "../components/profile/SettingsTab";
import OrderDetail from "../components/profile/OrderDetail";

const Profile = ({ user, accounts, setAccounts, setUser, onLogout }) => {
  // ----------------- State Management -----------------
  const { orderHistory } = useOrder(); // Lấy orderHistory từ OrderContext
  const [address, setAddress] = useState(user?.address || "");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); 
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);


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

  // Hàm mở modal chi tiết đơn hàng
  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    // Ngăn cuộn trang khi modal mở
    document.body.style.overflow = "hidden";
  };

  // Hàm đóng modal chi tiết đơn hàng
  const closeOrderDetail = () => {
    setSelectedOrder(null);
    // Cho phép cuộn trang lại khi đóng modal
    document.body.style.overflow = "auto";
  };

  // ------------- Animation Variants -------------
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const cardVariants = {
    hover: {
      y: -8,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  const tabVariants = {
    inactive: {
      opacity: 0.7,
      y: 0,
    },
    active: {
      opacity: 1,
      y: 0,
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
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
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  // Lọc đơn hàng theo userId để chỉ hiển thị đơn hàng của người dùng hiện tại
  const userOrders = orderHistory.filter(
    (order) => !order.userId || order.userId === user?.id
  );

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
      {/* Thông báo */}
      <Notification notification={notification} />

      <div className="container mx-auto px-4">
        <motion.div
          className="bg-black/40 backdrop-blur-md rounded-2xl p-6 md:p-8 max-w-6xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.2,
          }}
        >
          {/* Header với phần chào mừng và nút đăng xuất */}
          <ProfileHeader
            user={user}
            onLogout={onLogout}
            containerVariants={containerVariants}
            itemVariants={itemVariants}
            buttonVariants={buttonVariants}
          />

          {/* Tab điều hướng */}
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            containerVariants={containerVariants}
            tabVariants={tabVariants}
          />

          {/* Nội dung các tab */}
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <ProfileTab
                user={user}
                address={address}
                setAddress={setAddress}
                orderHistory={userOrders}
                handleUpdateAddress={handleUpdateAddress}
                contentVariants={contentVariants}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
                buttonVariants={buttonVariants}
                cardVariants={cardVariants}
                setActiveTab={setActiveTab}
                openOrderDetail={openOrderDetail}
              />
            )}

            {activeTab === "orders" && (
              <OrdersTab
                orderHistory={userOrders}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                contentVariants={contentVariants}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
                buttonVariants={buttonVariants}
                statusColors={statusColors}
                openOrderDetail={openOrderDetail}
              />
            )}

            {activeTab === "settings" && (
              <SettingsTab
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                handleChangePassword={handleChangePassword}
                contentVariants={contentVariants}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
                buttonVariants={buttonVariants}
                cardVariants={cardVariants}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            closeDetail={closeOrderDetail}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            statusColors={statusColors}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  accounts: PropTypes.array.isRequired,
  setAccounts: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Profile;