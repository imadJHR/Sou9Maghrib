import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Loader2 } from "lucide-react";

const Products = ({ onAddToCart }) => {
  const url = "http://localhost:5000";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${url}/api/products`);

        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();

        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.category.length === 0 ||
      (product.category && filters.category.includes(product.category));
    const matchesBrand =
      filters.brand.length === 0 ||
      (product.brand && filters.brand.includes(product.brand));
    const matchesSearch =
      searchTerm === "" ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesBrand && matchesSearch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset current page to 1 when filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  // Filter Content
  const FilterContent = ({ filters, setFilters, searchTerm, setSearchTerm }) => (
    <div className="space-y-6">
      
      <Separator />
      {["category", "brand"].map((type) => (
        <div key={type} className="space-y-2">
          <h3 className=" text-sm font-bold text-secondary  capitalize">{type}</h3>
          {[...new Set(products.map((product) => product[type]))]
            .filter((item) => item && item.toLowerCase() !== "n/a") // Exclusion de "n/a"
            .map((item) => (
              <div key={item} className="flex text-[#678e81] items-center space-x-2">
                <Checkbox
                  id={`${type}-${item}`}
                  checked={filters[type].includes(item)}
                  onCheckedChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      [type]: prev[type].includes(item)
                        ? prev[type].filter((i) => i !== item)
                        : [...prev[type], item],
                    }))
                  }
                />
                <Label htmlFor={`${type}-${item}`}>{item}</Label>
              </div>
            ))}
        </div>
      ))}
      <Button
        onClick={() => setFilters({ category: [], brand: [] })}
        className="w-full bg-[#678e81] mt-4"
      >
        Réinitialiser les filtres
      </Button>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="text-center p-6">
        <CardContent>
          <p className="text-red-500">Erreur : {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl sm:text-3xl text-[#678e81] font-bold">
          Tous les produits
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/4 space-y-6">
          <Card className="hidden bg-gray-50 lg:block">
            <CardHeader>
              <CardTitle className="text-[#678e81]">Filtres</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-300px)] text-[#678e81]">
                <FilterContent
                  filters={filters}
                  setFilters={setFilters}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </ScrollArea>
            </CardContent>
          </Card>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden w-full">
                <Menu className="mr-2 h-4 w-4" /> Filtres
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <ScrollArea className="h-[calc(100vh-80px)]">
                <FilterContent
                  filters={filters}
                  setFilters={setFilters}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  className="text-[#678e81]"
                />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </aside>
        <main className="w-full lg:w-3/4">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-10">
                <p className="text-muted-foreground">
                  Aucun produit ne correspond aux filtres sélectionnés.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
