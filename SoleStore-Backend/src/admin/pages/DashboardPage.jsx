import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/productService.js';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch products
        const productsData = await fetchProducts();
        
        // Set mock data for now - will be replaced with real API calls later
        setStats({
          products: productsData.length || 0,
          orders: 35,
          revenue: 12580.50,
          users: 154
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <i className="fas fa-spinner fa-spin text-2xl text-indigo-600"></i>
        <p className="mt-2">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Total Products</h3>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Total Orders</h3>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 font-medium">Total Users</h3>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
        </div>
        <div className="p-4">
          <p className="text-gray-500 italic">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;