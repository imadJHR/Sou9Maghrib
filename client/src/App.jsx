import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import SingleProduct from "./pages/SingleProduct";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);
  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  //add to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  //remove cart
  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
  };

  //update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Safeguard against invalid quantity
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem._id === id ? { ...cartItem, quantity } : cartItem
      )
    );
  };
  const getCartItems = () => cart;
  return (
    <div>
      <AnimatePresence>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Navbar
              cartCount={cartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              )}
              onCartClick={() => navigate("/cart")}
            />
            <ToastContainer />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home onAddToCart={addToCart} />} />
              <Route
                path="/products"
                element={<Products onAddToCart={addToCart} />}
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    onRemoveFromCart={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                  />
                }
              />
              <Route
                path="/checkout"
                element={<Checkout cartItems={cartItems} />}
              />
              <Route
                path="/products/:id"
                element={<SingleProduct onAddToCart={addToCart} />}
              />
            </Routes>
            <Footer />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
