import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowLeft, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import ProductCard from "@/components/ProductCard";

const SingleProduct = ({ onAddToCart }) => {
  const url = "https://sou9maghrib-api.onrender.com";
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${url}/api/products/${id}`
        );
        if (!response.ok) throw new Error("Produit introuvable.");
        const data = await response.json();
        setProduct(data);
        setSelectedImage(0);

        // Fetch all products for random selection
        const allProductsResponse = await fetch(
          `${url}/api/products`
        );
        if (!allProductsResponse.ok)
          throw new Error("Impossible de charger les produits associés.");
        const allProducts = await allProductsResponse.json();
        
        // Filter out current product and get random products
        const otherProducts = allProducts.filter(item => item._id !== data._id);
        const shuffled = otherProducts.sort(() => 0.5 - Math.random());
        setRelatedProducts(shuffled.slice(0, 6));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ... keep existing code (loading, error states and UI rendering)

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Button onClick={() => navigate(-1)} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
      </Button>

      {/* Main Product Details */}
      <Card className="mb-12 bg-gray-50 overflow-hidden">
        <CardHeader className="bg-muted">
          <CardTitle className="text-3xl font-bold">{product?.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="w-full lg:w-1/2">
              <div className="aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={`${url}/${product?.image}`}
                  alt={product?.name}
                  className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6 w-full lg:w-1/2">
              <h1 className="text-3xl font-bold">Description : </h1>
              <p className="text-black">{product?.description}</p>
              <p className="text-3xl font-bold text-[#678e81]">
                {product?.price?.toLocaleString("fr-FR", {
                  style: "currency",
                  currency: "MAD",
                })}
              </p>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Quantité en stock :</span>
                <Badge
                  variant={product?.quantity > 0 ? "default" : "destructive"}
                >
                  {product?.quantity > 0
                    ? `${product.quantity} disponibles`
                    : "En Stock"}
                </Badge>
              </div>

              <Button
                onClick={() => {
                  onAddToCart(product);
                  toast.success("Produit ajouté au panier !");
                }}
                className="w-full bg-[#678e81] hover:bg-black sm:w-auto"
                size="lg"
                disabled={product?.quantity === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {product?.quantity > 0 ? "Ajouter au panier" : "Ajouter au panier"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Random Products Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Autres produits qui pourraient vous intéresser</h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct._id}
                product={relatedProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-lg">
            Aucun produit trouvé.
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
