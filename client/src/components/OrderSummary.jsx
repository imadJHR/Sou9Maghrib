
import { motion } from "framer-motion";

const OrderSummary = ({ cartItems, subtotal, deliveryFee, totalPrice }) => {
  const url = "https://sou9maghrib-api.onrender.com";
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold font-serif  mb-4 text-black">Résumé de la commande</h2>
      <ul className="space-y-2 mb-4">
        {cartItems.map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`${url}/${item.image}`}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>{item.name} x {item.quantity}</span>
            </div>
            <span>{(item.price * item.quantity).toFixed(2)} Dhs</span>
          </motion.li>
        ))}
      </ul>
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between">
          <span>Total produit</span>
          <span>{subtotal.toFixed(2)} Dhs</span>
        </div>
        <div className="flex justify-between">
          <span>Frais de livraison</span>
          <span>{deliveryFee.toFixed(2)} Dhs</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{totalPrice.toFixed(2)} Dhs</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
