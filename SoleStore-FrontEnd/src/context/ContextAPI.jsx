import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create a context for managing orders
const OrderContext = createContext();

// Order provider component
export const OrderProvider = ({ children }) => {
    // Initialize state with data from localStorage if available
    const [orderList, setOrderList] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Initialize order history from localStorage
    const [orderHistory, setOrderHistory] = useState(() => {
        const savedHistory = localStorage.getItem('orderHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(orderList));
    }, [orderList]);

    // Save order history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    }, [orderHistory]);

    // Add item to cart
    const addToCart = (selectedProduct) => {
        // Check if item is already in cart
        const existingProductIndex = orderList.findIndex(
            item => item.id === selectedProduct.id && item.size === selectedProduct.size
        );

        if (existingProductIndex !== -1) {
            // Update quantity of existing item
            const updatedOrderList = [...orderList];
            updatedOrderList[existingProductIndex] = {
                ...updatedOrderList[existingProductIndex],
                quantity: updatedOrderList[existingProductIndex].quantity + selectedProduct.quantity
            };
            setOrderList(updatedOrderList);
        } else {
            // Add new item to cart
            setOrderList([...orderList, selectedProduct]);
        }
    };

    // Remove item from cart
    const removeFromCart = (id) => {
        setOrderList(orderList.filter(item => item.id !== id));
    };

    // Update quantity of an item in cart
    const updateQuantity = (id, newQuantity) => {
        setOrderList(orderList.map(item => 
            item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
        ));
    };

    // Calculate subtotal of items in cart
    const calculateSubtotal = () => {
        return orderList.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    // Clear the cart
    const clearCart = () => {
        setOrderList([]);
    };

    // Add order to history and clear cart
    const saveOrderToHistory = (orderDetails) => {
        // Generate a unique order ID
        const orderId = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        
        // Create the complete order object
        const completedOrder = {
            id: orderId,
            date: new Date().toISOString(),
            status: "processing", // Initial status: processing
            items: [...orderList],
            ...orderDetails
        };
        
        // Add to order history
        setOrderHistory([completedOrder, ...orderHistory]);
        
        // Clear cart
        clearCart();
        
        return completedOrder;
    };

    // Context value
    const value = {
        orderList,
        setOrderList,
        addToCart,
        removeFromCart,
        updateQuantity,
        calculateSubtotal,
        clearCart,
        orderHistory,
        setOrderHistory,
        saveOrderToHistory
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

OrderProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// Custom hook for using the order context in a separate export
// This helps avoid Fast Refresh issues
export const useOrder = () => useContext(OrderContext);