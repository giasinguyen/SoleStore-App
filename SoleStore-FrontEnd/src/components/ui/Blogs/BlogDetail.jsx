import { useEffect } from 'react';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import blogs from "../../../Data/blogs.json";

const BlogDetail = () => {
    const { blogId } = useParams();
    const blog = blogs.find(item => item.id === parseInt(blogId));
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [blogId]);
    if (!blog) {
        return (
            <Container className="my-5">
                <h2>Không tìm thấy bài viết!</h2>
                <Button as={Link} to="/blogs" variant="primary" className="mt-3">
                    Quay lại danh sách blog
                </Button>
            </Container>
        );
    }


    const relatedBlogs = blogs
        .filter(item => item.id !== parseInt(blogId))
        .slice(0, 3);

    return (
        <Container className="my-5">

            <h1 className="mb-3">{blog.title}</h1>

            <Row className="align-items-center mb-4">
                <Col xs="auto">
                    <Badge bg="info">{blog.category}</Badge>
                </Col>
                <Col xs="auto">
                    <span className="text-muted small">Tác giả: {blog.author}</span>
                </Col>
                <Col xs="auto">
                    <span className="text-muted small">{new Date(blog.date).toLocaleDateString()}</span>
                </Col>
            </Row>

            <img
                src={blog.image}
                alt={blog.title}
                className="img-fluid rounded mb-4 shadow"
                style={{ maxHeight: '450px', objectFit: 'cover', width: '100%' }}
            />

            <div className="blog-content mb-5" dangerouslySetInnerHTML={{ __html: blog.content }} />

            {/* ----------- BLOG LIÊN QUAN ----------- */}
            <h3 className="mb-4">Bài viết liên quan</h3>
            <Row>
                {relatedBlogs.map(item => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card className="h-100 shadow-sm border-0">
                            <Card.Img
                                variant="top"
                                src={item.image}
                                alt={item.title}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Badge bg="success" className="mb-2" style={{ width: "fit-content" }}>
                                    {item.category}
                                </Badge>
                                <Card.Title className="fs-5">{item.title}</Card.Title>
                                <Card.Text className="text-muted small mb-2">
                                    {item.author} - {new Date(item.date).toLocaleDateString()}
                                </Card.Text>
                                <Card.Text className="flex-grow-1">{item.summary}</Card.Text>

                                <Button
                                    as={Link}
                                    to={`/blogs/${item.id}`}
                                    variant="outline-primary"
                                    size="sm"
                                    className="mt-auto"
                                >
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

export default BlogDetail;
