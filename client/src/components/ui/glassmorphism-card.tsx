import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassmorphismCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  children: React.ReactNode;
  variant?: 'blue' | 'purple' | 'pink' | 'none';
  animate?: boolean;
  hoverEffect?: boolean;
  className?: string;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  variant = 'none',
  animate = false,
  hoverEffect = true,
  className,
  ...props
}) => {
  // Determine the neon border class based on the variant
  const borderClass = variant !== 'none' ? `neon-border-${variant}` : '';
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: hoverEffect ? { 
      y: -10, 
      transition: { duration: 0.3 }
    } : {}
  };

  return (
    <motion.div
      className={cn("glass rounded-xl p-6", borderClass, className)}
      initial={animate ? "initial" : false}
      animate={animate ? "animate" : false}
      whileHover="hover"
      variants={cardVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassmorphismCard;
