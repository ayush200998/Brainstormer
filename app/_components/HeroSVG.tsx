'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Pre-computed positions for particles
const particles = [
  { cx: 150, cy: 120, r: 2, opacity: 0.6 },
  { cx: 250, cy: 180, r: 1.5, opacity: 0.4 },
  { cx: 350, cy: 150, r: 2.5, opacity: 0.7 },
  { cx: 450, cy: 230, r: 1, opacity: 0.5 },
  { cx: 550, cy: 170, r: 2, opacity: 0.6 },
  { cx: 650, cy: 140, r: 1.8, opacity: 0.5 },
  { cx: 180, cy: 260, r: 1.2, opacity: 0.4 },
  { cx: 280, cy: 320, r: 2.2, opacity: 0.7 },
  { cx: 380, cy: 280, r: 1.7, opacity: 0.5 },
  { cx: 480, cy: 350, r: 2.4, opacity: 0.6 },
  { cx: 580, cy: 290, r: 1.3, opacity: 0.4 },
  { cx: 130, cy: 390, r: 1.6, opacity: 0.5 },
  { cx: 230, cy: 430, r: 2.3, opacity: 0.7 },
  { cx: 330, cy: 370, r: 1.4, opacity: 0.4 },
  { cx: 430, cy: 410, r: 1.9, opacity: 0.6 },
  { cx: 530, cy: 450, r: 2.1, opacity: 0.5 },
  { cx: 600, cy: 380, r: 1.8, opacity: 0.6 },
  { cx: 200, cy: 480, r: 1.5, opacity: 0.4 },
  { cx: 400, cy: 500, r: 2, opacity: 0.7 },
  { cx: 500, cy: 460, r: 1.7, opacity: 0.5 },
];

const HeroSVG = () => {
  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto lg:mx-0 lg:max-w-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Grid Background */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        >
          <pattern id="grid" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(15)">
            <rect width="100%" height="100%" fill="none" />
            <path d="M 40 0 L 0 0 0 40" stroke="rgba(120, 130, 255, 0.2)" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </motion.g>

        {/* Document Icon */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <rect x="200" y="150" width="180" height="220" rx="10" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
          <line x1="230" y1="190" x2="350" y2="190" stroke="#4ADE80" strokeWidth="2" />
          <line x1="230" y1="220" x2="320" y2="220" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="230" y1="250" x2="340" y2="250" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="230" y1="280" x2="300" y2="280" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="230" y1="310" x2="330" y2="310" stroke="#4ADE80" strokeWidth="2" />
        </motion.g>

        {/* Diagram Element */}
        <motion.g
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <rect x="420" y="180" width="180" height="160" rx="10" fill="#8B5CF6" fillOpacity="0.2" stroke="#8B5CF6" strokeWidth="2" />
          
          {/* Flowchart elements */}
          <circle cx="460" cy="220" r="15" fill="transparent" stroke="#4ADE80" strokeWidth="2" />
          <rect x="500" cy="205" width="60" height="30" rx="5" fill="transparent" stroke="white" strokeOpacity="0.8" strokeWidth="2" />
          <polygon points="460,260 445,290 475,290" fill="transparent" stroke="#3B82F6" strokeWidth="2" />
          <rect x="500" cy="275" width="60" height="30" rx="15" fill="transparent" stroke="#8B5CF6" strokeWidth="2" />
          
          {/* Connection lines */}
          <line x1="460" y1="235" x2="460" y2="260" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="475" y1="220" x2="500" y2="220" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="530" y1="235" x2="530" y2="275" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
          <line x1="475" y1="290" x2="500" y2="290" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" />
        </motion.g>

        {/* Code Element */}
        <motion.g
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <rect x="320" y="370" width="200" height="130" rx="10" fill="#4ADE80" fillOpacity="0.15" stroke="#4ADE80" strokeWidth="2" />
          <line x1="340" y1="395" x2="390" y2="395" stroke="#3B82F6" strokeWidth="2.5" />
          <line x1="340" y1="425" x2="480" y2="425" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="365" y1="425" x2="365" y2="455" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="340" y1="455" x2="440" y2="455" stroke="#8B5CF6" strokeWidth="2.5" />
          <line x1="340" y1="485" x2="420" y2="485" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
        </motion.g>

        {/* Connecting Lines between elements */}
        <motion.g
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          <path d="M 290 320 C 290 350, 320 370, 320 370" stroke="#4ADE80" strokeWidth="2" fill="transparent" />
          <path d="M 520 340 C 520 360, 490 370, 490 370" stroke="#8B5CF6" strokeWidth="2" fill="transparent" />
        </motion.g>

        {/* Particles - using pre-computed values */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 2, delay: 1.5 }}
        >
          {particles.map((particle, i) => (
            <circle 
              key={i} 
              cx={particle.cx} 
              cy={particle.cy} 
              r={particle.r} 
              fill="white" 
              opacity={particle.opacity} 
            />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
};

export default HeroSVG; 