import { ShoppingBag, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useOrder } from '../../../context/ContextAPI';

const CartIcon = () => {
    const { orderList, removeFromOrder } = useOrder();
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState(orderList);
    
    useEffect(() => {
        setCartItems(orderList);
    }, [orderList]);
    
    const navigate = useNavigate();
    
    const handleNavigate = (path) => {
        setCartOpen(false);
        navigate(path);
    };
    
    const handleRemoveItem = (id) => {
        removeFromOrder(id);
    };

    const subtotal = cartItems.reduce((total, item) => total + item.price, 0);
    
    // Hàm định dạng tiền tệ
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="position-relative me-2">
            <button
                className="header-icon-button"
                onClick={() => setCartOpen(!cartOpen)}
            >
                <ShoppingBag className="icon-svg" />
                <span className="header-badge">
                    {cartItems.length}
                </span>
            </button>

            {cartOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h6 className="mb-0">Giỏ hàng ({cartItems.length} sản phẩm)</h6>
                    </div>

                    <div className="cart-items">
                        {cartItems.length > 0 ? (
                            cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <p className="cart-item-name">{item.name}</p>
                                        <small className="cart-item-details">
                                            Size: {item.size}
                                        </small>
                                        <p className="cart-item-price">{formatCurrency(item.price)}</p>
                                    </div>
                                    <button
                                        className="cart-item-remove"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="cart-empty">
                                <p>Giỏ hàng trống</p>
                                <small>Thêm sản phẩm vào giỏ hàng để tiếp tục</small>
                            </div>
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <div className="cart-footer">
                            <div className="cart-subtotal">
                                <span>Tổng cộng:</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>

                            <div className="cart-actions">
                                <button onClick={() => handleNavigate('/checkout')} className="cart-button checkout-button">
                                    Thanh toán
                                </button>
                                <button onClick={() => handleNavigate('/cart')} className="cart-button view-cart-button">
                                    Xem giỏ hàng
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <style>{`
                .header-icon-button {
                    background: transparent;
                    border: none;
                    color: white;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    transition: all 0.3s ease;
                }
                
                .header-icon-button:hover {
                    background: rgba(245, 158, 11, 0.2);
                    transform: translateY(-2px);
                }
                
                .icon-svg {
                    width: 22px;
                    height: 22px;
                }
                
                .header-badge {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    background: linear-gradient(to right, #f59e0b, #ea580c);
                    color: white;
                    font-size: 10px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                }
                
                .cart-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 10px;
                    width: 320px;
                    background: rgba(31, 41, 55, 0.97);
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
                    z-index: 1000;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(8px);
                }
                
                .cart-header {
                    padding: 15px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                }
                
                .cart-items {
                    max-height: 240px;
                    overflow-y: auto;
                    padding: 10px 0;
                }
                
                .cart-item {
                    display: flex;
                    align-items: center;
                    padding: 10px 15px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .cart-item-image {
                    width: 48px;
                    height: 48px;
                    object-fit: cover;
                    border-radius: 8px;
                    margin-right: 12px;
                    background: white;
                }
                
                .cart-item-info {
                    flex-grow: 1;
                }
                
                .cart-item-name {
                    color: white;
                    font-weight: 500;
                    margin-bottom: 3px;
                    font-size: 14px;
                }
                
                .cart-item-details {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 12px;
                }
                
                .cart-item-price {
                    color: #fbbf24;
                    font-weight: 600;
                    margin-bottom: 0;
                    font-size: 14px;
                }
                
                .cart-item-remove {
                    background: transparent;
                    border: none;
                    color: #ef4444;
                    padding: 5px;
                    margin-left: 5px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                
                .cart-item-remove:hover {
                    background: rgba(239, 68, 68, 0.15);
                }
                
                .cart-empty {
                    padding: 20px;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.7);
                }
                
                .cart-empty p {
                    font-weight: 500;
                    margin-bottom: 5px;
                }
                
                .cart-empty small {
                    color: rgba(255, 255, 255, 0.5);
                }
                
                .cart-footer {
                    padding: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .cart-subtotal {
                    display: flex;
                    justify-content: space-between;
                    color: white;
                    font-weight: 600;
                    margin-bottom: 15px;
                }
                
                .cart-actions {
                    display: grid;
                    gap: 8px;
                }
                
                .cart-button {
                    padding: 8px 0;
                    border-radius: 8px;
                    font-weight: 500;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    border: none;
                }
                
                .checkout-button {
                    background: linear-gradient(to right, #f59e0b, #ea580c);
                    color: white;
                }
                
                .checkout-button:hover {
                    background: linear-gradient(to right, #d97706, #c2410c);
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(234, 88, 12, 0.3);
                }
                
                .view-cart-button {
                    background: rgba(255, 255, 255, 0.1);
                    color: white;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }
                
                .view-cart-button:hover {
                    background: rgba(255, 255, 255, 0.15);
                    transform: translateY(-2px);
                }
            `}</style>
        </div>
    );
};

export default CartIcon;