import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaBox, FaDollarSign, FaChartLine, FaClipboardList, FaTruck } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const SellerDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalOrders: 0,
    products: [],
    salesGrowth: [],
    recentOrders: [],
  });

  useEffect(() => {
    fetch("/api/seller-dashboard") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error(err));
  }, []);

  const salesGrowthData = {
    labels: dashboardData.salesGrowth.map((entry) => entry.date),
    datasets: [
      {
        label: "Sales Growth",
        data: dashboardData.salesGrowth.map((entry) => entry.sales),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-6">📊 Seller Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Sales" value={dashboardData.totalSales} icon={<FaShoppingCart />} color="blue" />
        <StatCard title="Total Revenue" value={`$${dashboardData.totalRevenue}`} icon={<FaDollarSign />} color="green" />
        <StatCard title="Total Orders" value={dashboardData.totalOrders} icon={<FaClipboardList />} color="yellow" />
        <StatCard title="Orders in Transit" value={dashboardData.recentOrders.length} icon={<FaTruck />} color="purple" />
      </div>

      {/* Sales Growth Chart */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">📈 Sales Growth Over Time</h3>
        <Line data={salesGrowthData} />
      </div>

      {/* Product Listings */}
      <h2 className="text-2xl font-bold text-indigo-600 mb-4">🛍️ Your Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardData.products.length > 0 ? (
          dashboardData.products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>

      {/* Recent Orders */}
      <h2 className="text-2xl font-bold text-red-500 mt-6 mb-4">📦 Recent Orders</h2>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        {dashboardData.recentOrders.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No recent orders.</p>
        )}
      </div>
    </div>
  );
};

// Stats Card
const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: "border-blue-500 text-blue-500",
    green: "border-green-500 text-green-500",
    yellow: "border-yellow-500 text-yellow-500",
    purple: "border-purple-500 text-purple-500",
  };

  return (
    <div className={`p-6 shadow-lg rounded-lg flex items-center justify-between border-l-4 ${colors[color]} bg-white dark:bg-gray-800 hover:scale-105 transition-transform`}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      <div className={`text-3xl ${colors[color]}`}>{icon}</div>
    </div>
  );
};

// Product Card
const ProductCard = ({ product }) => {
  return (
    <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{product.name}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2">${product.price}</p>
      <p className="text-gray-500 dark:text-gray-400">{product.status}</p>
    </div>
  );
};

// Get Status Color
const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-500 text-white";
    case "Shipped":
      return "bg-blue-500 text-white";
    case "Delivered":
      return "bg-green-500 text-white";
    case "Cancelled":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

export default SellerDashboard;
