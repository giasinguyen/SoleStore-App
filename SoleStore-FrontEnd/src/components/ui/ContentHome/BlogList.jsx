import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../../../services/api';
import { motion } from 'framer-motion';

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
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.h2 
                        className="text-3xl font-bold text-gray-800 mb-2 inline-block relative"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Tin Tức & Chia Sẻ
                        <div className="h-1 w-24 bg-blue-600 absolute -bottom-2 left-1/2 transform -translate-x-1/2 rounded-full"></div>
                    </motion.h2>
                    <motion.p 
                        className="text-gray-600 mt-6 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Các bài viết mới nhất về xu hướng giày dép và thời trang
                    </motion.p>
                </div>
                
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                                <div className="h-60 bg-gray-300"></div>
                                <div className="p-5">
                                    <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/4 mt-6"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                        <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <p className="mt-4 text-lg font-medium text-gray-600">Không có bài viết nào.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog, index) => (
                            <motion.div 
                                key={blog.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full"
                            >
                                <div className="blog-card h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative overflow-hidden group">
                                        <Link to={`/blog/${blog.id}`} className="block">
                                            <div className="h-60 overflow-hidden">
                                                <img 
                                                    src={blog.image} 
                                                    alt={blog.title} 
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                                                    onError={(e) => {e.target.src = "https://via.placeholder.com/600x400?text=Blog+Image"}}
                                                />
                                            </div>
                                            <div className="absolute top-4 right-4 z-10">
                                                <span className="inline-block bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-md shadow-sm">
                                                    {blog.category}
                                                </span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {blog.author}
                                            </div>
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {formatDate(blog.date)}
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-xl mb-3 line-clamp-2 text-gray-800">
                                            <Link to={`/blog/${blog.id}`} className="no-underline text-gray-800 hover:text-gray-800">
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 line-clamp-3 mb-4">{blog.summary}</p>
                                        <Link 
                                            to={`/blog/${blog.id}`} 
                                            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                                        >
                                            Đọc thêm
                                            <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
                
                <motion.div 
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Link 
                        to="/blogs" 
                        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Xem tất cả bài viết
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogList;