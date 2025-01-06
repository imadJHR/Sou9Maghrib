import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CartPage = ({ cartItems, onRemoveFromCart, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const url = "http://localhost:5000";

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white p-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-24 h-24 mx-auto text-[#678e81] mb-4" />
          <h2 className="text-2xl font-bold font-serif text-gray-800 mb-4">Votre panier est vide</h2>
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/products")}
            className="bg-[#678e81]  "
          >
            Continuer les achats
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold  font-serif mb-8 text-center">votre panier </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="bg-gray-100">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-48">
                        <img
                          src={`${url}/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                            <p className="font-semibold">{item.price} Dhs</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveFromCart(item)}
                            className="text-gray-400 transition-colors"
                          >
                            <Trash2 className="w-5 text-red-600 h-5" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-orange-50 rounded-full p-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 rounded-full bg-white shadow-sm hover:bg-orange-100 transition-colors disabled:opacity-50"
                            >
                              <Minus className="w-4 h-4" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="font-semibold w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-white shadow-sm hover:bg-orange-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <p className="font-semibold text-gray-800">
                            Total: {(item.price * item.quantity).toFixed(2)} Dhs
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <Card className="bg-gray-100">
              <CardHeader>
                <CardTitle>Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} Dhs</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frais de livraison</span>
                  <span>20 Dhs</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>{(totalPrice + 20).toFixed(2)} Dhs</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-[#678e81] "
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/menu")}
                  className="w-full border-[#A59D84] bg-#D7D3BF text-gray-600 hover:bg-[#A59D84] hover:text-white"
                >
                  Continue Shopping
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

