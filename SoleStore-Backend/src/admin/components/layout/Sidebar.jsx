import React from 'react';

const Sidebar = ({ isOpen, currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'chart-pie' },
    { id: 'products', label: 'Products', icon: 'shopping-bag' },
    { id: 'orders', label: 'Orders', icon: 'shopping-cart' },
    { id: 'employees', label: 'Employees', icon: 'users' }
  ];
  
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 bg-indigo-700 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="h-16 flex items-center justify-center border-b border-indigo-600">
        <h1 className={`font-bold text-xl ${isOpen ? 'block' : 'hidden'}`}>SoleStore Admin</h1>
        <span className={`text-2xl font-bold ${isOpen ? 'hidden' : 'block'}`}>SS</span>
      </div>
      
      <nav className="mt-5">
        <ul>
          {navItems.map(item => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center p-3 hover:bg-indigo-800 transition-colors ${
                  currentPage === item.id ? 'bg-indigo-800' : ''
                }`}
              >
                <i className={`fas fa-${item.icon} ${isOpen ? 'mr-3' : 'mx-auto'}`}></i>
                <span className={isOpen ? 'block' : 'hidden'}>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;