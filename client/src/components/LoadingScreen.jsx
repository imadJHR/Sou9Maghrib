import React, { useState, useEffect } from "react";
import logo from "../assets/logoNav.png";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MinimalistLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const loadingDuration = 3000; // Durée de chargement en millisecondes (3 secondes)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextValue = prev + 100 / (loadingDuration / 100);
        return nextValue >= 100 ? 100 : nextValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const circleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#678e81] flex flex-col items-center justify-center z-50"
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={containerVariants}
        className="relative flex flex-col items-center"
      >
        {/* Logo */}
        <motion.div
          variants={circleVariants}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-white rounded-full p-4"
        >
          <img
            src={logo}
            alt="Company Logo"
            width={250}
            height={250}
            className="rounded-full shadow-md"
          />
        </motion.div>

        {/* Abstract animation */}
        <motion.div className="relative w-40 h-40 mb-8">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              variants={circleVariants}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2,
              }}
              className={`absolute inset-0 border-2 rounded-full ${
                index === 0 ? "border-primary" : index === 1 ? "border-secondary" : "border-accent"
              }`}
              style={{
                scale: 1 - index * 0.2,
              }}
            />
          ))}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Loader2 className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          variants={circleVariants}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">chargement</h2>
          <p className="text-black">S'il vous plaît, attendez...</p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          variants={circleVariants}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 w-64"
        >
          <Progress value={progress} className="w-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MinimalistLoadingScreen;
