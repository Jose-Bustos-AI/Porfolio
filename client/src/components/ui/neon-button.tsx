import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: React.ReactNode;
  variant?: 'filled' | 'outline' | 'gradient';
  color?: 'blue' | 'purple' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  asLink?: boolean;
  href?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  variant = 'filled',
  color = 'blue',
  size = 'md',
  fullWidth = false,
  className,
  asLink = false,
  href,
  ...props
}) => {
  // Base styles
  const baseStyles = "rounded-full font-semibold transition-all duration-300 flex items-center justify-center";
  
  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  // Color and variant styles
  const colorClasses = {
    blue: '#00EEFF',
    purple: '#BD00FF',
    pink: '#FF00A0'
  };
  
  const variantStyles = {
    filled: `bg-[#0A0A18] neon-border-${color} hover:animate-pulse-glow`,
    outline: `bg-transparent border border-white/20 hover:border-white/80`,
    gradient: `bg-gradient-to-r from-[#00EEFF] via-[#BD00FF] to-[#FF00A0] text-black hover:opacity-90`
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const buttonVariants = {
    initial: {},
    hover: { 
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    active: { 
      scale: 0.97,
      transition: { duration: 0.1 }
    }
  };
  
  const ButtonComponent = (
    <motion.button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], widthClass, className)}
      initial="initial"
      whileHover="hover"
      whileTap="active"
      variants={buttonVariants}
      {...props}
    >
      {children}
    </motion.button>
  );
  
  // Return either a button or an anchor depending on asLink prop
  if (asLink && href) {
    return (
      <motion.a
        href={href}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], widthClass, className)}
        initial="initial"
        whileHover="hover"
        whileTap="active"
        variants={buttonVariants}
      >
        {children}
      </motion.a>
    );
  }
  
  return ButtonComponent;
};

export default NeonButton;
