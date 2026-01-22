// src/components/global/Button.jsx
import { motion } from 'framer-motion';

export const Button = ({
  className = '',
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  onClick, // added missing comma here
}) => {
  const buttonVariants = {
    primary: {
      backgroundColor: 'bg-primary',
      color: 'text-white',
      hover: {
        backgroundColor: 'hover:bg-primary-dark',
      },
    },
    secondary: {
      backgroundColor: 'bg-gray-900',
      color: 'text-white',
      hover: {
        backgroundColor: 'hover:bg-gray-700',
      },
    },
  };

  const buttonClasses = [
    'rounded-md',
    'py-2',
    'px-4',
    'text-center',
    'font-semibold',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'cursor-pointer',
    buttonVariants[variant].backgroundColor,
    buttonVariants[variant].color,
    block ? 'w-full' : '',
    disabled ? 'pointer-events-none opacity-50' : '',
  ];

  return (
    <motion.button
      className={`${className} ${buttonClasses.join(' ')}`}
      onClick={onClick}
      whileHover={{
        ...buttonVariants[variant].hover,
      }}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
