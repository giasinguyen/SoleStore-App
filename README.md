# SoleStore - Cửa hàng Giày Trực tuyến

![SoleStore Logo](SoleStore-FrontEnd/src/assets/images/logo.png)

## Tổng quan

SoleStore là một nền tảng thương mại điện tử hiện đại dành cho việc bán giày dép trực tuyến. Dự án được phát triển với kiến trúc chia thành Frontend và Backend riêng biệt, sử dụng các công nghệ tiên tiến để mang lại trải nghiệm người dùng tối ưu và hiệu suất cao.

## Tính năng chính

### Khách hàng
- Duyệt sản phẩm với nhiều bộ lọc (theo loại, giá, thương hiệu, v.v.)
- Hỗ trợ tìm kiếm sản phẩm
- Xem chi tiết sản phẩm và đánh giá
- Giỏ hàng và thanh toán
- Đăng ký và quản lý tài khoản
- Xem lịch sử đơn hàng

### Quản trị viên
- Quản lý sản phẩm (thêm, sửa, xóa)
- Quản lý đơn hàng
- Quản lý nhân viên
- Thống kê và phân tích bán hàng
- Quản lý danh mục sản phẩm

## Công nghệ sử dụng

### Frontend
- React.js
- Vite (công cụ build)
- Tailwind CSS
- React Router
- Context API (quản lý trạng thái)
- React Bootstrap
- Axios (gọi API)

### Backend
- Node.js
- Express.js
- MongoDB (cơ sở dữ liệu)
- JWT (xác thực người dùng)
- Middleware xác thực và phân quyền

## Cấu trúc dự án

```
SoleStore-App/
├── README.md
├── SoleStore-Backend/       # Backend API và server
│   ├── src/
│   │   ├── controllers/     # Xử lý logic từ routes
│   │   ├── models/          # Mô hình dữ liệu
│   │   ├── routes/          # Định nghĩa API endpoints
│   │   ├── middleware/      # Middleware xác thực và xử lý yêu cầu
│   │   ├── config/          # Cấu hình ứng dụng và database
│   │   ├── utils/           # Tiện ích chung
│   │   └── Server.js        # Điểm khởi đầu ứng dụng
│   └── package.json
│
└── SoleStore-FrontEnd/      # Frontend React app
    ├── src/
    │   ├── components/      # Components tái sử dụng
    │   ├── pages/           # Các trang trong ứng dụng
    │   ├── context/         # Context API
    │   ├── assets/          # Hình ảnh và tài nguyên tĩnh
    │   └── Data/            # Dữ liệu mẫu (JSON)
    └── package.json
```

## Hướng dẫn cài đặt

### Yêu cầu hệ thống
- Node.js (v14 trở lên)
- npm hoặc yarn
- MongoDB

### Bước 1: Clone dự án
```bash
git clone https://github.com/your-username/SoleStore-App.git
cd SoleStore-App
```

### Bước 2: Cài đặt Backend
```bash
cd SoleStore-Backend
npm install
```

### Bước 3: Cài đặt Frontend
```bash
cd ../SoleStore-FrontEnd
npm install
```

### Bước 4: Cấu hình môi trường
Tạo file `.env` trong thư mục `SoleStore-Backend` với nội dung:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/solestore
JWT_SECRET=your_jwt_secret_key
```

### Bước 5: Chạy ứng dụng

#### Backend:
```bash
cd SoleStore-Backend
npm run dev
```

#### Frontend:
```bash
cd SoleStore-FrontEnd
npm run dev
```

## Triển khai

### Frontend
Frontend có thể được triển khai trên Netlify, Vercel hoặc các dịch vụ lưu trữ tĩnh khác.

### Backend
Backend có thể được triển khai trên Heroku, AWS, DigitalOcean hoặc các dịch vụ đám mây khác.

## Đóng góp
1. Fork dự án
2. Tạo nhánh tính năng (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi của bạn (`git commit -m 'Add some amazing feature'`)
4. Push lên nhánh (`git push origin feature/amazing-feature`)
5. Mở Pull Request

## Giấy phép
Phân phối theo giấy phép MIT. Xem `LICENSE` để biết thêm thông tin.

## Liên hệ
- Email: example@solestore.com
- Website: www.solestore.com