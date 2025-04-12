import { useState, useEffect } from 'react';
import { Alert, Button, Col, Container, Form, Row, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Contact = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id.replace('form', '').toLowerCase()]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }
        
        setShowAlert(true);
        setValidated(false);
        
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });

        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { 
            scale: 1.05,
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
            transition: { duration: 0.2 }
        },
        tap: { scale: 0.95 }
    };

    const mapVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } }
    };

    return (
        <motion.div
            className="contact-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                minHeight: '100vh',
                paddingTop: '80px',
                paddingBottom: '80px',
            }}
        >
            <Container className="position-relative">
                <motion.div
                    className="text-center mb-5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 
                        className="display-4 text-white fw-bold mb-2" 
                        variants={itemVariants}
                    >
                        Liên Hệ Với Chúng Tôi
                    </motion.h1>
                    <motion.div 
                        className="mx-auto" 
                        style={{ width: '80px', height: '4px', background: 'linear-gradient(to right, #4481eb, #04befe)' }}
                        variants={itemVariants}
                    ></motion.div>
                    <motion.p 
                        className="text-white mt-4 mb-5" 
                        variants={itemVariants}
                    >
                        Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi ngay hôm nay!
                    </motion.p>
                </motion.div>

                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="position-fixed top-0 start-50 translate-middle-x p-3"
                        style={{ zIndex: 1050, marginTop: '80px' }}
                    >
                        <Alert variant="success" className="d-flex align-items-center shadow-lg" onClose={() => setShowAlert(false)} dismissible>
                            <div className="me-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <div>
                                <strong>Thành công!</strong> Tin nhắn của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất có thể!
                            </div>
                        </Alert>
                    </motion.div>
                )}

                <Row className="g-4">
                    <Col lg={5} md={12} className="mb-4 mb-lg-0">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="h-100"
                        >
                            <Card className="bg-dark text-white h-100 border-0">
                                <Card.Body className="p-4">
                                    <motion.h3 
                                        className="mb-4 border-bottom pb-2" 
                                        variants={itemVariants}
                                    >
                                        Thông Tin Liên Hệ
                                    </motion.h3>
                                    
                                    <motion.div 
                                        className="mb-4 d-flex align-items-center"
                                        variants={itemVariants}
                                    >
                                        <div className="contact-icon me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Địa Chỉ</h6>
                                            <p className="mb-0 text-white-50">12 Nguyễn Văn Bảo, Gò Vấp, TP. HCM</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="mb-4 d-flex align-items-center"
                                        variants={itemVariants}
                                    >
                                        <div className="contact-icon me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Điện Thoại</h6>
                                            <p className="mb-0 text-white-50">+84 (0)28 1234 5678</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="mb-4 d-flex align-items-center"
                                        variants={itemVariants}
                                    >
                                        <div className="contact-icon me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Email</h6>
                                            <p className="mb-0 text-white-50">info@solestore.com</p>
                                        </div>
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="mb-4 d-flex align-items-center"
                                        variants={itemVariants}
                                    >
                                        <div className="contact-icon me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">Giờ Làm Việc</h6>
                                            <p className="mb-0 text-white-50">Thứ 2 - Chủ Nhật: 9:00AM - 10:00PM</p>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="mt-5"
                                        variants={itemVariants}
                                    >
                                        <h5 className="mb-3">Kết nối với chúng tôi</h5>
                                        <div className="d-flex gap-3">
                                            <motion.a 
                                                href="#" 
                                                className="btn btn-outline-light rounded-circle p-2"
                                                whileHover={{ scale: 1.1, backgroundColor: '#3b5998', borderColor: '#3b5998' }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                </svg>
                                            </motion.a>
                                            <motion.a 
                                                href="#" 
                                                className="btn btn-outline-light rounded-circle p-2"
                                                whileHover={{ scale: 1.1, backgroundColor: '#1da1f2', borderColor: '#1da1f2' }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                                                </svg>
                                            </motion.a>
                                            <motion.a 
                                                href="#" 
                                                className="btn btn-outline-light rounded-circle p-2"
                                                whileHover={{ scale: 1.1, backgroundColor: '#e1306c', borderColor: '#e1306c' }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                                                </svg>
                                            </motion.a>
                                            <motion.a 
                                                href="#" 
                                                className="btn btn-outline-light rounded-circle p-2"
                                                whileHover={{ scale: 1.1, backgroundColor: '#0077b5', borderColor: '#0077b5' }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                                                </svg>
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                    
                    <Col lg={7} md={12}>
                        <motion.div
                            className="card border-0 shadow-lg bg-white"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <Card.Body className="p-4">
                                <motion.h3 
                                    className="text-dark mb-4" 
                                    variants={itemVariants}
                                >
                                    Gửi Tin Nhắn Cho Chúng Tôi
                                </motion.h3>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <motion.div variants={itemVariants}>
                                                <Form.Group className="mb-3" controlId="formName">
                                                    <Form.Label>Họ và Tên</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Nhập họ tên của bạn"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng nhập họ tên của bạn.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </motion.div>
                                        </Col>
                                        <Col md={6}>
                                            <motion.div variants={itemVariants}>
                                                <Form.Group className="mb-3" controlId="formEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="n14@gmail.com"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng nhập email hợp lệ.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col md={6}>
                                            <motion.div variants={itemVariants}>
                                                <Form.Group className="mb-3" controlId="formPhone">
                                                    <Form.Label>Số Điện Thoại</Form.Label>
                                                    <Form.Control
                                                        type="tel"
                                                        placeholder="Nhập số điện thoại"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                            </motion.div>
                                        </Col>
                                        <Col md={6}>
                                            <motion.div variants={itemVariants}>
                                                <Form.Group className="mb-3" controlId="formSubject">
                                                    <Form.Label>Chủ Đề</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                    >
                                                        <option value="">Chọn chủ đề...</option>
                                                        <option value="Hỏi về sản phẩm">Hỏi về sản phẩm</option>
                                                        <option value="Đặt hàng">Đặt hàng</option>
                                                        <option value="Trả hàng">Trả hàng</option>
                                                        <option value="Phản hồi dịch vụ">Phản hồi dịch vụ</option>
                                                        <option value="Khác">Khác</option>
                                                    </Form.Control>
                                                    <Form.Control.Feedback type="invalid">
                                                        Vui lòng chọn chủ đề.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </motion.div>
                                        </Col>
                                    </Row>
                                    
                                    <motion.div variants={itemVariants}>
                                        <Form.Group className="mb-4" controlId="formMessage">
                                            <Form.Label>Nội dung tin nhắn</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={5}
                                                placeholder="Nhập nội dung tin nhắn của bạn tại đây..."
                                                required
                                                value={formData.message}
                                                onChange={handleChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Vui lòng nhập nội dung tin nhắn.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </motion.div>
                                    
                                    <motion.div variants={itemVariants} className="text-center">
                                        <motion.button
                                            variants={buttonVariants}
                                            initial="rest"
                                            whileHover="hover"
                                            whileTap="tap"
                                            type="submit"
                                            className="btn btn-primary btn-lg px-5"
                                            style={{
                                                background: 'linear-gradient(to right, #4481eb, #04befe)',
                                                border: 'none',
                                                borderRadius: '30px'
                                            }}
                                        >
                                            Gửi Tin Nhắn
                                        </motion.button>
                                    </motion.div>
                                </Form>
                            </Card.Body>
                        </motion.div>
                    </Col>
                </Row>

                <motion.div
                    className="mt-5 p-2 bg-white rounded shadow-lg"
                    variants={mapVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="ratio ratio-21x9" style={{ minHeight: '400px' }}>
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9545738362166!2d106.70059661526038!3d10.73743096281386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0x8b7bb8cb05fe1b16!2sNguy%E1%BB%85n%20V%C4%83n%20Linh%2C%20T%C3%A2n%20Thu%E1%BA%ADn%20T%C3%A2y%2C%20Qu%E1%BA%ADn%207%2C%20Th%C3%A0nh%20ph%E1%BB%91%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1svi!2s!4v1649830347601!5m2!1svi!2s" 
                            width="100%" 
                            height="100%" 
                            style={{border: 0}} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="SoleStore Location Map">
                        </iframe>
                    </div>
                </motion.div>

                <motion.div
                    className="mt-5 mb-5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 
                        className="text-center text-white mb-4"
                        variants={itemVariants}
                    >
                        Câu Hỏi Thường Gặp
                    </motion.h2>
                    
                    <Row className="g-4">
                        <Col md={6}>
                            <motion.div
                                className="card border-0 h-100 shadow"
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            >
                                <Card.Body className="p-4">
                                    <h5 className="mb-3">Làm sao để theo dõi đơn hàng?</h5>
                                    <p className="mb-0">Bạn có thể theo dõi đơn hàng bằng cách đăng nhập vào tài khoản của mình và kiểm tra phần "Đơn hàng của tôi". Chúng tôi cũng sẽ gửi cập nhật qua email mỗi khi trạng thái đơn hàng thay đổi.</p>
                                </Card.Body>
                            </motion.div>
                        </Col>
                        <Col md={6}>
                            <motion.div
                                className="card border-0 h-100 shadow"
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            >
                                <Card.Body className="p-4">
                                    <h5 className="mb-3">Chính sách đổi trả như thế nào?</h5>
                                    <p className="mb-0">Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua hàng. Sản phẩm cần phải còn nguyên tem mác, chưa sử dụng và kèm theo hoá đơn mua hàng.</p>
                                </Card.Body>
                            </motion.div>
                        </Col>
                        <Col md={6}>
                            <motion.div
                                className="card border-0 h-100 shadow"
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            >
                                <Card.Body className="p-4">
                                    <h5 className="mb-3">Thời gian giao hàng là bao lâu?</h5>
                                    <p className="mb-0">Thời gian giao hàng phụ thuộc vào địa điểm của bạn. Thông thường, thời gian giao hàng nội thành từ 1-2 ngày, các tỉnh thành khác từ 3-5 ngày làm việc.</p>
                                </Card.Body>
                            </motion.div>
                        </Col>
                        <Col md={6}>
                            <motion.div
                                className="card border-0 h-100 shadow"
                                variants={itemVariants}
                                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                            >
                                <Card.Body className="p-4">
                                    <h5 className="mb-3">Có cửa hàng thực tế không?</h5>
                                    <p className="mb-0">Có, chúng tôi có nhiều cửa hàng trên toàn quốc. Bạn có thể tìm cửa hàng gần nhất trong mục "Hệ thống cửa hàng" trên website của chúng tôi.</p>
                                </Card.Body>
                            </motion.div>
                        </Col>
                    </Row>
                </motion.div>
            </Container>

            <style jsx>{`
                .contact-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(145deg, #4481eb, #04befe);
                    border-radius: 50%;
                    color: white;
                }
                
                .card {
                    transition: all 0.3s ease;
                }
                
                .form-control:focus {
                    border-color: #4481eb;
                    box-shadow: 0 0 0 0.25rem rgba(68, 129, 235, 0.25);
                }

                @media (max-width: 768px) {
                    .contact-page {
                        padding-top: 40px;
                        padding-bottom: 40px;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default Contact;
