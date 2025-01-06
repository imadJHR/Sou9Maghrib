import { Truck, Trophy, Tag } from 'lucide-react';

const Livraison = () => {
  return (
    <div className="py-16">
      <div className="bg-[#678e81] max-w-7xl mx-auto items-center text-center">
        <div className="p-8 md:p-28">
          <h1 className="text-2xl md:text-4xl text-white font-serif">
            Livraison Sur Casablanca et Mohammedia 20 dhs
          </h1>
          <h1 className="text-2xl md:text-4xl text-white font-serif">
            40 dhs Hors Casablanca
          </h1>
        </div>
      </div>
      <section className="py-16 md:py-28 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Delivery Feature */}
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full p-3 bg-white shadow-sm border border-pink-100">
                <Truck className="w-8 h-8 text-[#678e81]" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-700">
                Livraison en 12h
              </h3>
              <p className="text-gray-500 text-sm">
                de vos achats en ligne sur Casablanca
              </p>
            </div>

            {/* Best Price Feature */}
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full p-3 bg-white shadow-sm border border-pink-100">
                <Trophy className="w-8 h-8 text-[#678e81]" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-700">
                Meilleur prix garanti
              </h3>
              <p className="text-gray-500 text-sm">
                Les prix les plus compétitifs, garantis.
              </p>
            </div>

            {/* Exclusive Promo Feature */}
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-full p-3 bg-white shadow-sm border border-pink-100">
                <Tag className="w-8 h-8 text-[#678e81]" />
              </div>
              <h3 className="text-lg md:text-xl font-medium text-gray-700">
                Promo exclusive en ligne!
              </h3>
              <p className="text-gray-500 text-sm">
                Transformez vos espaces intérieurs avec élégance, sans vider votre porte-monnaie !
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Livraison;
