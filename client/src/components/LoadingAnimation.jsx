import { motion } from 'framer-motion';
import logo from "../assets/logoNav.png"

const LoadingAnimation = () => {
  return (
    <motion.img
      src={logo} 
     
      alt="Loading"
      animate={{
        scale: [1, 1.2, 1.2, 1, 1],
        rotate: [0, 180, 360, 360, 0],
        borderRadius: ["25%", "25%", "50%", "50%", "25%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className=" object-cover h-16"
    />
  );
};

export default LoadingAnimation;
