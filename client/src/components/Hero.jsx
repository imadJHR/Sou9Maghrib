import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Hero1 from "../assets/WhatsApp-Image-2024-12-07-at-6.54.45-PM.jpeg";

const CustomCursor = ({ mousePosition }) => (
  <motion.div
    className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
    animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
    transition={{ type: 'spring', stiffness: 500, damping: 28 }}
  />
);

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const images = [Hero1];

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="relative w-full min-h-[100svh] bg-gray-900 overflow-hidden">
      <CustomCursor mousePosition={mousePosition} />

      <div className="h-full w-full perspective">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="w-full h-full transform-3d"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: isImageLoaded ? 1 : 0, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            style={{
              transform: `translate3d(0, ${scrollY * 0.5}px, ${scrollY * 0.1}px) scale(${1 + scrollY * 0.001})`,
            }}
          >
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              onLoad={handleImageLoad}
              className="w-full h-[100svh] object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute hidden items-center justify-center top-1/2 left-4 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors focus:outline-none"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute hidden  items-center justify-center top-1/2 right-4 -translate-y-1/2 w-12 h-12 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors focus:outline-none"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-8 w-full flex justify-center items-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
