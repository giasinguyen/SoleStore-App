const express = require('express');
const router = require("./routers/index.router");
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3000;

require("dotenv").config();
// Cho phép tất cả domain truy cập (CORS mở)
app.use(cors());

// Hoặc cấu hình CORS chi tiết (nếu cần)
app.use(cors({
    origin: 'http://localhost:5111', // domain frontend của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // nếu frontend dùng cookie hoặc auth header
}));
//Public
app.use(express.static('public'))

router(app);

//connect database
const database = require("./config/database");
database.connect();
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
