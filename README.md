# SoleStore - Nền tảng thương mại điện tử chuyên về giày dép

<p align="center">
  <img src="SoleStore-FrontEnd/src/assets/images/logo.png" alt="SoleStore Logo" width="200"/>
</p>

<p align="center">
  <a href="#tổng-quan">Tổng quan</a> •
  <a href="#tính-năng-chính">Tính năng chính</a> •
  <a href="#công-nghệ-sử-dụng">Công nghệ sử dụng</a> •
  <a href="#cấu-trúc-dự-án">Cấu trúc dự án</a> •
  <a href="#hướng-dẫn-cài-đặt">Hướng dẫn cài đặt</a> •
  <a href="#demo">Demo</a> •
</p>

## Tổng quan

**SoleStore** là một ứng dụng web thương mại điện tử hiện đại chuyên về bán giày dép trực tuyến. Dự án được thiết kế với kiến trúc phân tách rõ ràng giữa Frontend và Backend, giúp việc phát triển và bảo trì trở nên dễ dàng hơn.

Với giao diện người dùng thân thiện và trải nghiệm mượt mà, SoleStore mang đến cho khách hàng một nền tảng mua sắm trực tuyến tiện lợi, đồng thời cung cấp công cụ quản lý hiệu quả cho người quản trị.

## Tính năng chính

### Dành cho khách hàng
- **Duyệt và tìm kiếm sản phẩm**
  - Bộ lọc đa tiêu chí (loại giày, giá, thương hiệu, màu sắc, đánh giá)
  - Tìm kiếm theo từ khóa
  - Sắp xếp sản phẩm (mới nhất, giá tăng/giảm, phổ biến nhất)

- **Quản lý giỏ hàng**
  - Thêm/xóa sản phẩm
  - Cập nhật số lượng
  - Lưu giỏ hàng tự động

- **Trang chi tiết sản phẩm**
  - Hình ảnh chất lượng cao với gallery
  - Thông tin chi tiết sản phẩm
  - Đánh giá và bình luận
  - Gợi ý sản phẩm tương tự

- **Thanh toán**
  - Quy trình thanh toán đơn giản
  - Nhiều phương thức thanh toán
  - Lưu thông tin giao hàng

- **Tài khoản người dùng**
  - Đăng ký/đăng nhập
  - Lịch sử đơn hàng
  - Quản lý thông tin cá nhân
  - Danh sách yêu thích

### Dành cho quản trị viên
- **Quản lý sản phẩm**
- **Quản lý đơn hàng**
- **Quản lý người dùng**
- **Thống kê và báo cáo**
- **Quản lý blog và nội dung**

## Công nghệ sử dụng

### Frontend
- **[React.js](https://reactjs.org/)** - Thư viện JavaScript để xây dựng giao diện người dùng
- **[Vite](https://vitejs.dev/)** - Công cụ build nhanh cho ứng dụng web hiện đại
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS tiện dụng với các tiện ích
- **[React Router](https://reactrouter.com/)** - Định tuyến cho ứng dụng React
- **[Context API](https://reactjs.org/docs/context.html)** - Quản lý trạng thái ứng dụng
- **[React Bootstrap](https://react-bootstrap.github.io/)** - Tích hợp Bootstrap với React
- **[Framer Motion](https://www.framer.com/motion/)** - Thư viện animation cho React
- **[Axios](https://axios-http.com/)** - Thư viện HTTP client để gọi API

### Backend
- **[Node.js](https://nodejs.org/)** - Môi trường runtime JavaScript
- **[Express.js](https://expressjs.com/)** - Framework web cho Node.js
- **[MongoDB](https://www.mongodb.com/)** - Cơ sở dữ liệu NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM cho MongoDB và Node.js
- **[JSON Web Token (JWT)](https://jwt.io/)** - Xác thực và phân quyền người dùng
- **[Multer](https://github.com/expressjs/multer)** - Middleware xử lý upload file
- **[Cors](https://github.com/expressjs/cors)** - Middleware CORS cho Express

## Cấu trúc dự án

```
SoleStore-App/
├── README.md                          # Tài liệu dự án
├── SoleStore-Backend/                 # Backend API
│   ├── index.js                       # Entry point
│   ├── package.json                   # Dependencies
│   ├── config/                        # Cấu hình ứng dụng
│   ├── controller/                    # Business logic
│   ├── models/                        # Database models
│   ├── routers/                       # API routes
│   ├── helpers/                       # Helper functions
│   └── public/                        # Static assets
└── SoleStore-FrontEnd/                # React Frontend
    ├── src/
    │   ├── App.jsx                    # Main App component
    │   ├── components/                # Reusable components
    │   ├── pages/                     # Page components
    │   ├── context/                   # React Context
    │   ├── services/                  # API services
    │   ├── assets/                    # Static assets
    │   └── Data/                      # Mock data
    ├── index.html                     # HTML template
    ├── package.json                   # Dependencies
    └── vite.config.js                 # Vite configuration
```

## Hướng dẫn cài đặt

### Yêu cầu hệ thống
- **Node.js** (v14+)
- **npm** hoặc **yarn**
- **MongoDB** (local hoặc MongoDB Atlas)

### Bước 1: Clone dự án
```bash
git clone https://github.com/giasinguyen/SoleStore-App.git
cd SoleStore-App
```

### Bước 2: Cài đặt Backend
```bash
cd SoleStore-Backend
npm install

# Tạo file .env với nội dung:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/solestore
# JWT_SECRET=your_secret_key
```

### Bước 3: Cài đặt Frontend
```bash
cd ../SoleStore-FrontEnd
npm install
```

### Bước 4: Khởi chạy ứng dụng
Trong một terminal:
```bash
# Từ thư mục SoleStore-Backend
npm start
```

Trong terminal khác:
```bash
# Từ thư mục SoleStore-FrontEnd
npm run dev
```

Sau đó truy cập:
- Frontend: http://localhost:5111
- Backend API: http://localhost:3000

## Giấy phép

Dự án này được phân phối dưới giấy phép MIT. Xem thêm [LICENSE](LICENSE) để biết chi tiết.

