import React from "react";
import { motion } from "framer-motion";

const DeliveryForm = ({ formData, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 font-serif  text-black">Détails de livraison</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom et prénom</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse de livraison</label>
          <textarea
            id="address"
            value={formData.address}
            onChange={(e) => onChange("address", e.target.value)}
            required
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          ></textarea>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="mt-6 w-full bg-[#678e81] text-white py-2 px-4 rounded-md hover:bg-[#C1BAA1] focus:outline-none focus:ring-2transition-colors duration-200"
      >
        Place Order
      </motion.button>
    </form>
  );
};

export default DeliveryForm;

