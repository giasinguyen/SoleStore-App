import { useEffect, useState } from "react";
import listAccount from "../Data/account.json";
import { motion, AnimatePresence } from "framer-motion";
import Profile from "./Profile";

const AccountPage = () => {
  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem("accounts");
    return storedAccounts ? JSON.parse(storedAccounts) : listAccount;
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  // ------------------- Đăng nhập -------------------
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );
    if (account) {
      setUser(account);
      localStorage.setItem("user", JSON.stringify(account));
      alert("Đăng nhập thành công!");
    } else {
      alert("Email hoặc mật khẩu không đúng!");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // ------------------- Đăng ký -------------------
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, phone, address } = registerInfo;
    if (!name || !email || !password || !phone || !address) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const emailExists = accounts.some((acc) => acc.email === email);
    if (emailExists) {
      alert("Email đã tồn tại, vui lòng dùng email khác!");
      return;
    }

    const newAccount = {
      id: accounts.length + 1,
      ...registerInfo,
    };

    const updatedAccounts = [...accounts, newAccount];
    setAccounts(updatedAccounts);

    setUser(newAccount);
    localStorage.setItem("user", JSON.stringify(newAccount));

    alert("Đăng ký và đăng nhập thành công!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
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

  // ------------------- UI -------------------
  // Nếu đã đăng nhập, hiển thị trang Profile
  if (user) {
    return (
      <Profile 
        user={user} 
        accounts={accounts} 
        setAccounts={setAccounts} 
        setUser={setUser} 
        onLogout={handleLogout}
      />
    );
  }

  // Nếu chưa đăng nhập → hiện đăng nhập hoặc đăng ký
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-cover bg-fixed bg-center relative"
      style={{
        backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="container mx-auto px-4 py-10 z-10">
        <motion.div 
          className="max-w-md mx-auto relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            delay: 0.2
          }}
        >
          <div className="flex mb-0 rounded-t-xl overflow-hidden relative">
            <button
              onClick={() => setShowLogin(true)}
              className={`w-1/2 py-3 font-medium text-sm transition-all duration-300 ease-in-out 
                            ${
                              showLogin
                                ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg"
                                : "bg-gray-800/50 text-gray-300"
                            }`}
            >
              ĐĂNG NHẬP
            </button>
            <button
              onClick={() => setShowLogin(false)}
              className={`w-1/2 py-3 font-medium text-sm transition-all duration-300 ease-in-out 
                            ${
                              !showLogin
                                ? "bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg"
                                : "bg-gray-800/50 text-gray-300"
                            }`}
            >
              ĐĂNG KÝ
            </button>
            
            <motion.div 
              className="absolute bottom-0 h-1 bg-white"
              initial={false}
              animate={{ 
                left: showLogin ? "0%" : "50%",
                width: "50%" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="backdrop-blur-md bg-white/10 rounded-b-xl rounded-tr-xl shadow-2xl overflow-hidden border border-white/20">
            <AnimatePresence mode="wait">
              {showLogin ? (
                // Login Form
                <motion.div
                  key="login"
                  className="p-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 text-center"
                    variants={itemVariants}
                  >
                    Chào mừng trở lại
                  </motion.h2>
                  <form onSubmit={handleLogin} className="space-y-5">
                    <motion.div className="relative" variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <motion.input
                          type="email"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Nhập email của bạn"
                          value={loginInfo.email}
                          onChange={(e) =>
                            setLoginInfo({
                              ...loginInfo,
                              email: e.target.value,
                            })
                          }
                          required
                          whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
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
                              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                          </svg>
                        </span>
                      </div>
                    </motion.div>
                    <motion.div className="relative" variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2">
                        Mật khẩu
                      </label>
                      <div className="relative">
                        <motion.input
                          type="password"
                          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Nhập mật khẩu của bạn"
                          value={loginInfo.password}
                          onChange={(e) =>
                            setLoginInfo({
                              ...loginInfo,
                              password: e.target.value,
                            })
                          }
                          required
                          whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.5)" }}
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
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
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </span>
                      </div>
                    </motion.div>
                    <motion.button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Đăng nhập
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  className="p-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.h2 
                    className="text-2xl font-bold text-white mb-6 text-center"
                    variants={itemVariants}
                  >
                    Tạo tài khoản mới
                  </motion.h2>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2">
                        Họ tên
                      </label>
                      <motion.input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        placeholder="Họ và tên của bạn"
                        value={registerInfo.name}
                        onChange={(e) =>
                          setRegisterInfo({
                            ...registerInfo,
                            name: e.target.value,
                          })
                        }
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(52, 211, 153, 0.5)" }}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2">
                        Email
                      </label>
                      <motion.input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        placeholder="Email của bạn"
                        value={registerInfo.email}
                        onChange={(e) =>
                          setRegisterInfo({
                            ...registerInfo,
                            email: e.target.value,
                          })
                        }
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(52, 211, 153, 0.5)" }}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2">
                        Mật khẩu
                      </label>
                      <motion.input
                        type="password"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        placeholder="Mật khẩu của bạn"
                        value={registerInfo.password}
                        onChange={(e) =>
                          setRegisterInfo({
                            ...registerInfo,
                            password: e.target.value,
                          })
                        }
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(52, 211, 153, 0.5)" }}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2">
                        Số điện thoại
                      </label>
                      <motion.input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        placeholder="Số điện thoại của bạn"
                        value={registerInfo.phone}
                        onChange={(e) =>
                          setRegisterInfo({
                            ...registerInfo,
                            phone: e.target.value,
                          })
                        }
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(52, 211, 153, 0.5)" }}
                      />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <label className="block text-white text-sm font-medium mb-2">
                        Địa chỉ
                      </label>
                      <motion.input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                        placeholder="Địa chỉ của bạn"
                        value={registerInfo.address}
                        onChange={(e) =>
                          setRegisterInfo({
                            ...registerInfo,
                            address: e.target.value,
                          })
                        }
                        required
                        whileFocus={{ scale: 1.01, boxShadow: "0px 0px 8px rgba(52, 211, 153, 0.5)" }}
                      />
                    </motion.div>
                    <motion.button
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 mt-2"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Đăng ký
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AccountPage;