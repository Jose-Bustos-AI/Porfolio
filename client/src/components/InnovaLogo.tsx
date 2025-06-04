import React from 'react';
import { motion } from 'framer-motion';

interface InnovaLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const InnovaLogo: React.FC<InnovaLogoProps> = ({ 
  width = 40, 
  height = 40, 
  className = "" 
}) => {
  return (
    <motion.div 
      className={`flex items-center justify-center ${className}`}
      style={{ width, height }}
      animate={{ 
        filter: [
          "drop-shadow(0 0 10px rgba(98, 217, 87, 0.5))",
          "drop-shadow(0 0 20px rgba(230, 86, 22, 0.5))",
          "drop-shadow(0 0 10px rgba(98, 217, 87, 0.5))"
        ]
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <svg 
        viewBox="0 0 200 200" 
        width={width} 
        height={height}
        className="w-full h-full"
      >
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00EEFF" />
            <stop offset="100%" stopColor="#0088FF" />
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#62d957" />
            <stop offset="100%" stopColor="#3fa832" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E65616" />
            <stop offset="100%" stopColor="#cc4915" />
          </linearGradient>
        </defs>
        
        {/* Main robot head/cube */}
        <rect 
          x="70" 
          y="70" 
          width="60" 
          height="60" 
          rx="8" 
          fill="url(#blueGradient)"
        />
        
        {/* Robot eyes */}
        <circle cx="85" cy="90" r="4" fill="#030015" />
        <circle cx="115" cy="90" r="4" fill="#030015" />
        
        {/* Robot mouth */}
        <rect x="90" y="105" width="20" height="3" rx="1.5" fill="#030015" />
        
        {/* Antenna */}
        <circle cx="100" cy="60" r="3" fill="url(#blueGradient)" />
        <rect x="99" y="60" width="2" height="10" fill="url(#blueGradient)" />
        
        {/* Orbital rings */}
        <g fill="none" strokeWidth="8" strokeLinecap="round">
          {/* Blue ring */}
          <motion.path
            d="M 50 100 A 50 50 0 1 1 150 100"
            stroke="url(#blueGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Green ring */}
          <motion.path
            d="M 30 100 A 70 70 0 0 1 170 100"
            stroke="url(#greenGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          
          {/* Orange ring */}
          <motion.path
            d="M 170 100 A 70 70 0 0 1 30 100"
            stroke="url(#orangeGradient)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </g>
      </svg>
    </motion.div>
  );
};

export default InnovaLogo;