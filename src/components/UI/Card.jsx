import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  gradient = false,
  hover = true,
  padding = 'default'
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  const baseStyles = `bg-primary-surface rounded-xl ${paddingStyles[padding]} ${className}`;
  const gradientStyles = gradient ? 'gradient-border' : 'border border-white/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)' } : {}}
      className={`${baseStyles} ${gradientStyles}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;

// Made with Bob
