import { motion } from 'framer-motion';

const LoadingText = () => {
  const words = "Firdaous Paradise Spa & Massage".split(" ");
  
  return (
    <div className="flex flex-wrap justify-center font-prata gap-2">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="text-white text-xl md:text-2xl font-light"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default LoadingText;