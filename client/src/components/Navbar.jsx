import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBasket, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../assets/logoNav.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

export function Navbar({ cartCount, onCartClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="flex justify-center">
              <Link to="/" className="flex-shrink-0">
              tr
                <img src={Logo} alt="Logo" className="h-8 w-auto" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/products"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Tous les produits
              </Link>
              <Link
                to="/products?brand=Dell's"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dell's
              </Link>
              <Link
                to="/products?brand=FoFood"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                FoFood
              </Link>
              <Link
                to="/products?brand=Silicone moule"
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Silicone moule
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  onClick={onCartClick}
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                >
                  <ShoppingBasket className="h-5 w-5" />
                  <span className="sr-only">Panier</span>
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <SignedOut>
                  <Link to="/login">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Login
                    </Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Menu className="h-6 w-6" aria-hidden="true" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                      <Link
                        to="/products"
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={handleLinkClick}
                      >
                        Tous les produits
                      </Link>
                      <NavDropdown
                        title="Dell's"
                        items={[
                          {
                            to: "/products",
                            label: "Purée de mocktail dell's",
                          },
                          {
                            to: "/products",
                            label:
                              "Purée de mocktail dell's (sans sucre ajouté)",
                          },
                          { to: "/products", label: "Ice tea dell's" },
                        ]}
                        mobile
                      />
                      <NavDropdown
                        title="FoFood"
                        items={[
                          {
                            to: "/products",
                            label: "Purée de mocktail fo food",
                          },
                          {
                            to: "/products",
                            label:
                              "Purée de mocktail fo food (sans sucre ajouté)",
                          },
                          { to: "/products", label: "Ice tea fo food" },
                        ]}
                        mobile
                      />
                      <Link
                        to="/products"
                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                        onClick={handleLinkClick}
                      >
                        Silicone moule
                      </Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center px-5">
                        <SignedOut>
                          <Link to="/login" onClick={handleLinkClick}>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                              Login
                            </Button>
                          </Link>
                        </SignedOut>
                        <SignedIn>
                          <UserButton />
                        </SignedIn>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavDropdown({ title, items, mobile }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`${
            mobile ? "w-full justify-start" : ""
          } text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium`}
        >
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={mobile ? "center" : "end"} className="w-56">
        {items.map((item, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              to={item.to}
              className="w-full"
              onClick={mobile ? () => setIsMenuOpen(false) : null}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
