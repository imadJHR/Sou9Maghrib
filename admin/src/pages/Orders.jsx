import { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Package, Phone, MapPin, ShoppingBag } from 'lucide-react';

const OrdersPage = () => {
  const url = "https://sou9maghrib-api.onrender.com";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/orders`);
        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const showNotification = (message) => {
    const notification = document.createElement("div");
    notification.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${url}/api/orders/${id}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== id)
      );
      showNotification("Order deleted successfully!");
    } catch (err) {
      console.error("Error deleting order:", err);
      showNotification("Failed to delete order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-50 text-red-500 px-6 py-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center md:text-left">
            Tableau de bord des commandes
          </h1>
          <div className="bg-white px-4 py-2 rounded-full shadow-sm mt-4 md:mt-0">
            <span className="text-sm font-medium text-gray-500">
              Total des commandes: {orders.length}
            </span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Aucune commande disponible pour le moment</p>
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-white font-bold text-xl mb-1">
                        {order.customerName}
                      </h2>
                      <div className="flex items-center text-blue-100">
                        <Package className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {order.items.length} items
                        </span>
                      </div>
                    </div>
                    <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                      {order.totalPrice} Dhs
                    </span>
                  </div>
                </div>

                {order.imageUrl && (
                  <div className="relative h-48">
                    <img
                      src={order.imageUrl}
                      alt="Order"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-4 space-y-4 flex-grow">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Commander des articles
                    </h3>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <span>{item.name}</span>
                          <span className="font-medium">×{item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{order.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{order.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto p-4 bg-gray-50">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 active:bg-red-100 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span className="font-medium">Delete Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
