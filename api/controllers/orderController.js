import orderModel from "../models/orderModel.js";

// Fonction pour configurer les sockets
let io;

export const setSocket = (socketInstance) => {
  io = socketInstance;
};

// Récupérer toutes les commandes
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Unable to fetch orders" });
  }
};

// Récupérer une commande par ID
export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (err) {
    console.error("Error fetching order by ID:", err);
    res.status(500).json({ error: "Unable to fetch order" });
  }
};

// Créer une nouvelle commande
export const createOrder = async (req, res) => {
  try {
    const { customerName, address, phone, items, totalPrice, status } = req.body;

    const newOrder = new orderModel({
      customerName,
      address,
      phone,
      items,
      totalPrice,
      status,
    });

    await newOrder.save(); // Sauvegarde de la commande dans la base de données

    // Émission d'un événement Socket.IO après la création d'une commande
    if (io) {
      io.emit("newOrder", newOrder); // Envoyer les détails de la nouvelle commande au frontend
    }

    res.status(200).json({ success: true, message: "Order placed successfully!" });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ success: false, error: "Failed to place the order" });
  }
};

// Supprimer une commande
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Émission d'un événement Socket.IO après la suppression d'une commande
    if (io) {
      io.emit("deleteOrder", { id }); // Envoyer l'ID de la commande supprimée au frontend
    }

    res.status(200).json({ success: true, message: "Order deleted successfully!" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, error: "Failed to delete the order" });
  }
};
