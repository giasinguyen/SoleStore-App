import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { blogAPI } from "../services/api";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const data = await blogAPI.getAllBlogs();
                setBlogs(data);
                setLoading(false);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách blog:', error);
                setLoading(false);
            }
        };
        
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <Container className="my-5 d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Đang tải...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="my-5 shadow p-4 bg-white rounded">
            <h2 className="text-center mb-4">Tin Tức & Khuyến Mãi</h2>
            <Row>
                {blogs.map((blog) => (
                    <Col key={blog.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={blog.image}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Badge bg="success" className="mb-2" style={{ width: "fit-content" }}>
                                    {blog.category}
                                </Badge>
                                <Card.Title className="fs-5">{blog.title}</Card.Title>
                                <Card.Text className="text-muted small mb-2">
                                    {blog.author} - {new Date(blog.date).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text className="flex-grow-1">
                                    {blog.summary}
                                </Card.Text>
                                <Button as={Link} to={`/blogs/${blog.id}`} variant="outline-primary" size="sm" className="mt-auto">
                                    Đọc thêm
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Blog;
