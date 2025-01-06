import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSummary from "../components/OrderSummary";
import DeliveryForm from "../components/DeliveryForm";

const CheckoutPage = ({ cartItems }) => {
  const url = "https://sou9maghrib-api.onrender.com";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = 20;
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPrice = subtotal + deliveryFee;

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error("Please fill in all the fields.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const orderData = {
      customerName: formData.name,
      address: formData.address,
      phone: formData.phone,
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal,
      deliveryFee,
      totalPrice,
      status: "pending",
    };

    try {
      const response = await axios.post(`${url}/api/orders`, orderData);

      if (response.data.success) {
        toast.success("Order placed successfully!");
        localStorage.removeItem("cart");
        setTimeout(() => navigate("/"), 3000);
      } else {
        toast.error("There was an issue placing your order.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Failed to place the order. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Vérifier la commande</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            totalPrice={totalPrice}
          />
          <DeliveryForm
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default CheckoutPage;
