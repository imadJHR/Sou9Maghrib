import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom"; // Import de useNavigate
import { Button } from "./ui/button";
import { Eye, ShoppingCart } from "lucide-react";

export function BestSellers({ onAddToCart }) {
  const url = "https://sou9maghrib-api.onrender.com";
  const navigate = useNavigate(); // Initialisation de navigate
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${url}/api/products`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des produits");
        }
        const data = await response.json();
        setSellers(data.slice(0, 4)); // Limiter les produits aux 4 premiers
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 max-w-7xl mx-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-secondary text-center mb-8 font-serif">
          Fo Food
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mb-10 gap-6">
          {sellers.length > 0 ? (
            sellers.map((product) => (
              <Card
                key={product._id}
                className="group relative flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="p-0 aspect-square overflow-hidden">
                  <div className="relative w-full h-full">
                    <img
                      src={`${url}/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 bg-gradient-to-b from-gray-50 to-white">
                  <CardTitle className="text-sm font-semibold text-gray-800 line-clamp-5 hover:text-[#678e81] transition duration-200">
                    {product.name}
                  </CardTitle>
                  <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#678e81]">
                    {product.price.toFixed(2)} Dhs
                  </span>
                </div>
                </CardContent>
                <CardFooter className="p-4 bg-gray-50">
                  <div className="w-full grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-green-900 border-[#678e81] hover:bg-indigo-50"
                      onClick={() => navigate(`/products/${product._id}`)} // Navigate vers la page du produit
                    >
                      <Eye className="wr4  h-4 mr-2" />
                      <span className="hidden md:flex">Détails</span>
                    </Button>
                    <Button
                      size="sm"
                      className=" w-full bg-[#678e81] hover:bg-green-900 text-white"
                      onClick={() => onAddToCart(product)} // Ajout au panier
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      <span className="hidden md:flex">Ajouter </span>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Chargement des produits...
            </p>
          )}
        </div>
        <Link to="/products">
          <Button className="bg-[#678e81] py-2 px-4 rounded-lg hover:bg-black text-xl font-serif hover:text-[#678e81] transition duration-300">
            Découvrir plus de produits
          </Button>
        </Link>
      </div>
    </section>
  );
}
