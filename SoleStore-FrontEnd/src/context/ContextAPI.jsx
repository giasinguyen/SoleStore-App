import { createContext, useContext, useState } from "react";

const ContextAPI = createContext();

// eslint-disable-next-line react/prop-types
export const OrderProvider = ({ children }) => {
    // Quản lý sản phẩm
    const [orderList, setOrderList] = useState([]);

    const addToOrder = (dish) => {
        setOrderList([...orderList, dish]);
    };
    const removeFromOrder = (id) => {
        setOrderList(orderList.filter(item => item.id !== id));
    };
    const updateQuantity = (id, quantity) => {
        const updatedOrder = orderList.map(item =>
            item.id === id ? { ...item, quantity: parseInt(quantity) } : item
        );
        setOrderList(updatedOrder);
    };
    // Quản lý account
    const [user, setUser] = useState(null);

    const login = (userData) => {
        updateUser(userData);
    };

    const logout = () => {
        updateUser(null);
    };

    const register = (newUser) => {
        updateUser(newUser);
    };
    const updateUser = (updatedInfo) => {
        console.log("Cập nhật user với:", updatedInfo);
        setUser(prev => ({
            ...prev,
            ...updatedInfo
        }));
    };
    return (
        <ContextAPI.Provider value={{ user, updateUser, login, logout, register, orderList, setOrderList, addToOrder, removeFromOrder, updateQuantity }}>
            {children}
        </ContextAPI.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOrder = () => {
    return useContext(ContextAPI);
};