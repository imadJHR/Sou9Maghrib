import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Eye } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const url = "https://sou9maghrib-api.onrender.com";

  const handleViewDetails = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-0 aspect-square overflow-hidden">
        <div className="relative w-full h-full">
          <img
            src={`${url}/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.oldPrice && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              Sale
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-between flex-grow p-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="space-y-2">
          <CardTitle className="text-lg font-semibold text-gray-800 ">
            {product.name}
          </CardTitle>
        </div>

        <div className="flex items-baseline justify-between mt-auto">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-[#678e81]">
              {product.price.toFixed(2)} Dhs
            </p>
            {product.oldPrice && (
              <p className="text-sm text-gray-500 line-through ">
                {product.oldPrice.toFixed(2)} Dhs
              </p>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 bg-gray-50">
        <div className="w-full grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full text-green-900 border-[#678e81] hover:bg-indigo-50"
            onClick={handleViewDetails}
          >
            <Eye className="w-4 h-4 mr-2" />
            <span className="hidden md:flex ">Détails</span>
          </Button>
          <Button
            size="sm"
            className="w-full bg-[#678e81] hover:bg-green-900 text-white"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            <span className="hidden md:flex ">Ajouter</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
