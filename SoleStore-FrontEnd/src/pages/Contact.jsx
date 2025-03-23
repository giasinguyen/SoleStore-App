import { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

const Contact = () => {
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAlert(true);

        // Chuyển về trang chủ sau 2 giây
        setTimeout(() => {
            window.location.href = 'http://localhost:5111/';
        }, 2000);
    };

    return (
        <div
            style={{
                backgroundImage: `url('https://m.yodycdn.com/blog/hinh-nen-giay-jordan-yody-vn-62.jpg')`,
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '50px 0',
            }}
        ><Container
            className="my-5 p-4 rounded shadow-lg"
            style={{
                backgroundColor: 'rgb(255 255 255 / 0%)',
                backdropFilter: 'blur(5px)',
                color: "white"
            }}
        >
                <h2 className="text-center mb-4 ">Liên Hệ Với Chúng Tôi</h2>
                <p className="text-center ">
                    Chúng tôi rất mong nhận được phản hồi từ bạn. Vui lòng điền vào biểu mẫu dưới đây và chúng tôi sẽ liên hệ lại sớm nhất có thể.
                </p>

                {showAlert && (
                    <Alert variant="success" className="text-center">
                        Tin nhắn của bạn đã được gửi thành công! Đang chuyển về trang chủ...
                    </Alert>
                )}

                <Form className="mt-4" onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formName"
                            >
                                <Form.Label>Họ và Tên</Form.Label>
                                <Form.Control type="text" required style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    border: '1px solid #fff',
                                    color: '#fff',
                                    backdropFilter: 'blur(5px)',
                                    boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                                }} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="formEmail"
                            >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" required style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                    border: '1px solid #fff',
                                    color: '#fff',
                                    backdropFilter: 'blur(5px)',
                                    boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formMessage">
                        <Form.Label>Nội dung tin nhắn</Form.Label>
                        <Form.Control as="textarea" rows={4} required style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            border: '1px solid #fff',
                            color: '#fff',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 0 5px rgba(255, 255, 255, 0.3)',
                        }} />
                    </Form.Group>

                    <div className="text-center">
                        <Button
                            variant="primary"
                            type="submit"
                            className="px-4 py-2 shadow-sm"
                            style={{ transition: '0.3s' }}
                        >
                            Gửi Tin Nhắn
                        </Button>
                    </div>
                </Form>
            </Container>

        </div>

    );
};

export default Contact;
