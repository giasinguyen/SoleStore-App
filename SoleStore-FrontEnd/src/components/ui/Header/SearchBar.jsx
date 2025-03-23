import { Search } from 'lucide-react';
import { useState } from 'react';
import { Form, FormControl, Image, InputGroup, ListGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import products from "../../../Data/products.json";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
                    {filteredProducts.slice(0, 3).map(product => (
                        <ListGroup.Item key={product.id} className="search-result-item">
                            <Link to={`/product/${product.id}`} className="search-result-link">
                                <div className="search-result-image-container">
                                    <Image 
                                        src={product.images[0]} 
                                        alt={product.name} 
                                        className="search-result-image"
                                    />
                                </div>
                                <div className="search-result-info">
                                    <div className="search-result-name">{product.name}</div>
                                    <div className="search-result-price">{product.price}</div>
                                </div>
                            </Link>
                        </ListGroup.Item>
                    ))}
                    {filteredProducts.length > 3 && (
                        <ListGroup.Item className="search-result-more">
                            <Link to={`/search?q=${searchTerm}`}>
                                Xem tất cả {filteredProducts.length} kết quả
                            </Link>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            )}

            <style>{`
                .search-bar {
                    margin-right: 12px;
                }
                
                .search-input-group {
                    border-radius: 50px;
                    overflow: hidden;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                
                .search-icon {
                    background: rgba(245, 158, 11, 0.2);
                    border: none;
                    color: white;
                }
                
                .search-input {
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                }
                
                .search-input::placeholder {
                    color: rgba(255, 255, 255, 0.6);
                }
                
                .search-input:focus {
                    background: rgba(255, 255, 255, 0.15);
                    color: white;
                    box-shadow: none;
                }
                
                .search-results {
                    position: absolute;
                    width: 300px;
                    max-height: 350px;
                    overflow-y: auto;
                    background: rgba(31, 41, 55, 0.95);
                    border-radius: 10px;
                    top: 100%;
                    right: 0;
                    margin-top: 5px;
                    z-index: 1000;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(4px);
                }
                
                .search-result-item {
                    background: transparent;
                    border: none;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 10px;
                }
                
                .search-result-link {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: white;
                }
                
                .search-result-image-container {
                    width: 50px;
                    height: 50px;
                    border-radius: 6px;
                    overflow: hidden;
                    margin-right: 12px;
                    background: white;
                }
                
                .search-result-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .search-result-info {
                    flex-grow: 1;
                }
                
                .search-result-name {
                    font-weight: 600;
                    margin-bottom: 3px;
                    color: white;
                }
                
                .search-result-price {
                    color: #fbbf24;
                    font-weight: 500;
                }
                
                .search-result-more {
                    text-align: center;
                    background: transparent;
                    border: none;
                    padding: 10px;
                }
                
                .search-result-more a {
                    color: #fbbf24;
                    text-decoration: none;
                    font-weight: 500;
                }
                
                .search-result-more a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;