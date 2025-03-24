import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import EmployeesPage from './pages/EmployeesPage';

const AdminApp = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'products':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'employees':
        return <EmployeesPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage}
    >
      {renderPage()}
    </Layout>
  );
};

export default AdminApp;