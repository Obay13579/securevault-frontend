import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  const variantStyles = {
    primary:
      'bg-blue-500 hover:bg-blue-600 text-white',
    secondary:
      'bg-gray-200 hover:bg-gray-300 text-gray-700',
    outline:
      'border border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500'
  };

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };