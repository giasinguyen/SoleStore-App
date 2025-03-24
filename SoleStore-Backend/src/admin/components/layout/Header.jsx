import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pr-8 pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-700">Admin User</span>
          <button className="text-gray-700 hover:text-red-500">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;