import { Facebook, Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logoFoo.png"

const Footer = () => {
  return (
    <footer className="bg-black w-full text-white py-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src={logo}
              className=" "
              alt="Company logo"
            />
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">À propos</h2>
            <p className="text-sm">
              Bienvenue sur notre site. Nous proposons une large gamme de
              produits de qualité à des prix compétitifs. Votre satisfaction est
              notre priorité.
            </p>
          </div>

          {/* Useful Links Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Liens utiles
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white">
                  Produits
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  À propos
                </a>
              </li>
              <li>
                <a target="_blank" href="https://wa.me/212645288216?text=%F0%9F%8C%90%20Transformez%20votre%20pr%C3%A9sence%20en%20ligne%20d%C3%A8s%20aujourd'hui%20%21%20Vous%20r%C3%AAvez%20d'un%20site%20web%20professionnel%2C%20moderne%20et%20efficace%20%3F%20%F0%9F%92%BB%20Je%20suis%20l%C3%A0%20pour%20concr%C3%A9tiser%20vos%20id%C3%A9es%20%21%20%20%F0%9F%93%A6%20Ce%20que%20j'offre%20%3A%20%E2%9C%85%20Un%20design%20sur-mesure%20et%20responsive%20%E2%9C%85%20Une%20navigation%20rapide%20et%20intuitive%20%E2%9C%85%20Int%C3%A9gration%20des%20derni%C3%A8res%20technologies%20(MERN%20Stack)%20%E2%9C%85%20Support%20continu%20pour%20vos%20besoins%20%20Envoyez-moi%20un%20message%20d%C3%A8s%20maintenant%20pour%20discuter%20de%20votre%20projet%20et%20profiter%20d'une%20offre%20exclusive%20%21%20%E2%9C%A8%20%20%F0%9F%93%B2%20Cliquez%20ici%20pour%20d%C3%A9marrer%20%3A%20%5BLien%20WhatsApp%5D" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
              Suivez-nous
            </h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">
              <Facebook />
              </a>
              <a href="#" className="hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.instagram.com/dev.option/" target="_blank" className="hover:text-white">
              <Instagram />
              </a>
              <a target="_blank" href="https://wa.me/212645288216?text=%F0%9F%8C%90%20Transformez%20votre%20pr%C3%A9sence%20en%20ligne%20d%C3%A8s%20aujourd'hui%20%21%20Vous%20r%C3%AAvez%20d'un%20site%20web%20professionnel%2C%20moderne%20et%20efficace%20%3F%20%F0%9F%92%BB%20Je%20suis%20l%C3%A0%20pour%20concr%C3%A9tiser%20vos%20id%C3%A9es%20%21%20%20%F0%9F%93%A6%20Ce%20que%20j'offre%20%3A%20%E2%9C%85%20Un%20design%20sur-mesure%20et%20responsive%20%E2%9C%85%20Une%20navigation%20rapide%20et%20intuitive%20%E2%9C%85%20Int%C3%A9gration%20des%20derni%C3%A8res%20technologies%20(MERN%20Stack)%20%E2%9C%85%20Support%20continu%20pour%20vos%20besoins%20%20Envoyez-moi%20un%20message%20d%C3%A8s%20maintenant%20pour%20discuter%20de%20votre%20projet%20et%20profiter%20d'une%20offre%20exclusive%20%21%20%E2%9C%A8%20%20%F0%9F%93%B2%20Cliquez%20ici%20pour%20d%C3%A9marrer%20%3A%20%5BLien%20WhatsApp%5D" className="">
              <FaWhatsapp className=" w-6 h-6" />
              </a>
              
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 text-center border-t border-gray-700 pt-4 text-sm">
          &copy; 2025 Sou9 Maghrib. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
