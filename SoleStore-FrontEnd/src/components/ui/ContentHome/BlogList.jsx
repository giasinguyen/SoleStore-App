import { Link } from 'react-router-dom';
import blogs from '../../../Data/blogs.json';

function BlogList() {

    const demoBlogs = blogs.slice(0, 3);

    return (
        <div className="container-custom mx-auto px-4 pt-5">
            <h1 className='pb-3'>Danh sách Blog </h1>

            <div className="row">
                {demoBlogs.map((blog) => (
                    <div
                        className="col-12 col-md-6 col-lg-4 mb-4"
                        key={blog.id}
                    >
                        <Link
                            to={`/blogs/${blog.id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'block',
                                height: '100%',
                                border: '1px solid #ddd',
                                padding: '10px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <img
                                src={blog.image}
                                alt={blog.title}
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '5px'
                                }}
                            />
                            <h3 style={{ margin: '10px 0' }}>{blog.title}</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>{blog.summary}</p>
                            <p style={{ fontSize: '12px', color: '#aaa' }}>
                                Tác giả: {blog.author} - Ngày: {blog.date}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>
            <Link
                to="/blogs"
                className="btn btn-secondary "
            >
                Xem tất cả
            </Link>
        </div>

    );
}

export default BlogList;
