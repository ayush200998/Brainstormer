'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Pre-generated shapes in fixed positions
  const shapes = [
    // Gradient circles
    { type: 'circle', x: '10%', y: '15%', size: '150px', color: 'from-blue-600/10 to-transparent', delay: 0 },
    { type: 'circle', x: '85%', y: '20%', size: '180px', color: 'from-purple-600/10 to-transparent', delay: 1.5 },
    { type: 'circle', x: '70%', y: '85%', size: '200px', color: 'from-green-400/10 to-transparent', delay: 0.8 },
    { type: 'circle', x: '5%', y: '80%', size: '120px', color: 'from-blue-500/10 to-transparent', delay: 2 },
    
    // Soft lines
    { type: 'line', x: '40%', y: '10%', length: '150px', angle: '45deg', color: 'bg-gradient-to-r from-blue-500/20 to-transparent', delay: 1.2 },
    { type: 'line', x: '60%', y: '75%', length: '120px', angle: '-30deg', color: 'bg-gradient-to-r from-purple-500/20 to-transparent', delay: 0.5 },
    { type: 'line', x: '20%', y: '60%', length: '100px', angle: '75deg', color: 'bg-gradient-to-r from-green-400/20 to-transparent', delay: 1.8 },
    
    // Square/Rectangle shapes
    { type: 'square', x: '75%', y: '30%', size: '100px', color: 'border-blue-500/30', delay: 0.3 },
    { type: 'square', x: '25%', y: '40%', size: '80px', color: 'border-purple-500/20', delay: 1 },
    { type: 'square', x: '50%', y: '80%', size: '120px', color: 'border-green-400/20', delay: 1.4 },
  ];

  // Don't render anything during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => {
        if (shape.type === 'circle') {
          return (
            <motion.div
              key={`circle-${index}`}
              className={`absolute rounded-full bg-gradient-radial ${shape.color}`}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                filter: 'blur(30px)',
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.1, 1],
                y: [`calc(${shape.y} - 20px)`, `calc(${shape.y} + 20px)`, `calc(${shape.y} - 20px)`],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: shape.delay,
                ease: "easeInOut"
              }}
            />
          );
        }
        
        if (shape.type === 'line') {
          return (
            <motion.div
              key={`line-${index}`}
              className={`absolute ${shape.color}`}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.length,
                height: '2px',
                filter: 'blur(4px)',
                transform: `rotate(${shape.angle})`,
                transformOrigin: 'center',
              }}
              initial={{ opacity: 0, scaleX: 0.7 }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleX: [0.7, 1.1, 0.7],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: shape.delay,
                ease: "easeInOut"
              }}
            />
          );
        }
        
        if (shape.type === 'square') {
          return (
            <motion.div
              key={`square-${index}`}
              className={`absolute border ${shape.color} border-opacity-30`}
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                borderRadius: '4px',
              }}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 45, 0],
                x: [`calc(${shape.x} - 20px)`, `calc(${shape.x} + 20px)`, `calc(${shape.x} - 20px)`],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                delay: shape.delay,
                ease: "easeInOut"
              }}
            />
          );
        }
        
        return null;
      })}
    </div>
  );
};

export default FloatingElements; 