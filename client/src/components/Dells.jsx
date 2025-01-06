import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from 'lucide-react';

const Dells = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const url = "https://sou9maghrib-api.onrender.com"
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${url}/api/products`);
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();

        const filtered = data.filter((product) => product.brand === "dell's");
        setProducts(filtered.slice(0, 4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">Erreur : {error}</p>;
  }

  if (products.length === 0) {
    return <p className="text-center">Aucun produit trouvé pour la marque Dell's.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">Dell's</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default Dells;

