import React from 'react';
import { Building2 } from 'lucide-react';
import dells from "../assets/dells.png";
import fofood from "../assets/fofood.png";

const brands = [
  {
    id: 1,
    image: dells,
    name: "Dell's",
  },
  {
    id: 2,
    image: fofood,
    name: "Fo Food",
  },

];

const BrandMarquee = () => {
  return (
    <section className="py-24 mt-16 bg-[#678e81]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-16">
          <Building2 className="w-8 h-8 text-black" />
          <h2 className="text-5xl font-bold text-white tracking-tight">
            Our <span className="text-emerald-400">Brands</span>
          </h2>
        </div>

        <div className="flex gap-8 justify-center py-8 flex-wrap">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group"
            >
              <div className="relative w-64 h-64 overflow-hidden rounded-2xl 
                             bg-slate-800 transition-all duration-300 
                             group-hover:scale-105 group-hover:shadow-2xl 
                             group-hover:shadow-emerald-500/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform 
                           duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="text-2xl font-semibold text-white 
                              group-hover:text-emerald-400 transition-colors 
                              duration-300">
                    {brand.name}
                  </p>
                  <div className="w-12 h-1 bg-emerald-400 mt-3 
                                transition-all duration-300 
                                group-hover:w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandMarquee;
