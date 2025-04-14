import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Form, FormControl, Image, InputGroup, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { productAPI } from "../../../services/api";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await productAPI.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu sản phẩm cho thanh tìm kiếm:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-bar position-relative">
            <Form>
                <InputGroup className="search-input-group">
                    <InputGroup.Text className="search-icon">
                        <Search size={18} />
                    </InputGroup.Text>
                    <FormControl
                        type="text"
                        placeholder="Tìm kiếm giày..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                </InputGroup>
            </Form>

            {searchTerm && (
                <ListGroup className="search-results">
                    {loading ? (
                        <ListGroup.Item>Đang tải...</ListGroup.Item>
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, 5).map(product => (
                            <Link 
                                key={product.id} 
                                to={`/product/${product.id}`} 
                                onClick={() => setSearchTerm('')}
                                className="text-decoration-none"
                            >
                                <ListGroup.Item className="d-flex align-items-center">
                                    <Image 
                                        src={product.images[0]} 
                                        alt={product.name} 
                                        width={40} 
                                        height={40} 
                                        className="me-3 object-fit-cover"
                                    />
                                    <div>
                                        <div className="search-product-name">{product.name}</div>
                                        <div className="search-product-price">{product.price.toLocaleString('vi-VN')}đ</div>
                                    </div>
                                </ListGroup.Item>
                            </Link>
                        ))
                    ) : (
                        <ListGroup.Item>Không tìm thấy sản phẩm nào</ListGroup.Item>
                    )}
                </ListGroup>
            )}
        </div>
    );
};

export default SearchBar;