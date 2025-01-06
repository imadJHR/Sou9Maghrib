import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-emerald-400/30 rounded-full 
                    blur-3xl animate-blob1 top-0 left-0" />
      <div className="absolute w-[400px] h-[400px] bg-teal-400/20 rounded-full 
                    blur-3xl animate-blob2 bottom-0 right-0" />
      <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 rounded-full 
                    blur-3xl animate-blob3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default AnimatedBackground;