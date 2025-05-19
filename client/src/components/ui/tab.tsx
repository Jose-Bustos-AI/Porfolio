import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  color?: 'blue' | 'purple' | 'pink';
  children: React.ReactNode;
  className?: string;
}

const Tab: React.FC<TabProps> = ({
  active = false,
  color = 'blue',
  children,
  className,
  ...props
}) => {
  const colorClass = color === 'blue' 
    ? 'hover:neon-border-blue' 
    : color === 'purple' 
      ? 'hover:neon-border-purple' 
      : 'hover:neon-border-pink';
  
  const activeClass = active 
    ? (color === 'blue' 
        ? 'neon-border-blue' 
        : color === 'purple' 
          ? 'neon-border-purple' 
          : 'neon-border-pink')
    : '';
  
  const tabVariants = {
    initial: {},
    hover: { 
      y: -3,
      transition: { duration: 0.2 }
    },
    active: { 
      y: 1,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.button
      className={cn(
        "px-6 py-3 rounded-full glass transition-all duration-300", 
        colorClass, 
        activeClass,
        className
      )}
      initial="initial"
      whileHover="hover"
      whileTap="active"
      variants={tabVariants}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Tab;
