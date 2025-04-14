import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../../services/api';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const data = await blogAPI.getAllBlogs();
                // Lấy 3 bài viết mới nhất
                setBlogs(data.slice(0, 3));
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu blog:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchBlogs();
    }, []);
    
    // Định dạng ngày tháng
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    return (
        <section className="blog-section py-5">
            <div className="container-custom">
                <div className="section-header text-center mb-5">
                    <h2 className="fw-bold position-relative d-inline-block">
                        Tin Tức & Chia Sẻ
                        <div className="title-underline"></div>
                    </h2>
                    <p className="text-muted mt-3">Các bài viết mới nhất về xu hướng giày dép và thời trang</p>
                </div>
                
                {loading ? (
                    <div className="row">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="blog-skeleton">
                                    <div className="skeleton-img"></div>
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text short"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-5">
                        <p>Không có bài viết nào.</p>
                    </div>
                ) : (
                    <div className="row">
                        {blogs.map((blog) => (
                            <div key={blog.id} className="col-lg-4 col-md-6 mb-4">
                                <div className="blog-card h-100">
                                    <Link to={`/blog/${blog.id}`} className="blog-image-container">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            className="blog-image" 
                                        />
                                        <div className="category-badge">{blog.category}</div>
                                    </Link>
                                    <div className="blog-content p-4">
                                        <div className="blog-meta text-muted mb-2">
                                            <span className="me-3"><i className="bi bi-person me-1"></i>{blog.author}</span>
                                            <span><i className="bi bi-calendar3 me-1"></i>{formatDate(blog.date)}</span>
                                        </div>
                                        <h3 className="blog-title">
                                            <Link to={`/blog/${blog.id}`} className="text-decoration-none text-dark">
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <p className="blog-excerpt text-muted">{blog.summary}</p>
                                        <Link to={`/blog/${blog.id}`} className="btn-read-more">
                                            Đọc thêm
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="text-center mt-5">
                    <Link to="/blog" className="btn-view-all">
                        Xem tất cả bài viết
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BlogList;
