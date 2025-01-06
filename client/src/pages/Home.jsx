import { BestSellers } from "@/components/BestSeller";
import Hero from "../components/Hero";
import Livraison from "@/components/Livraison";
import Marquee from "react-fast-marquee";
import Dells from "../components/Dells";
import Moule from "../components/Moule";
import Fofood from "@/components/FoFood";

const Home = ({ onAddToCart }) => {
  return (
    <div>
      <Hero />
      <Marquee />
      <Fofood onAddToCart={onAddToCart} />
      <Dells onAddToCart={onAddToCart} />
      <Moule onAddToCart={onAddToCart} />
      <Livraison />
    </div>
  );
};

export default Home;
