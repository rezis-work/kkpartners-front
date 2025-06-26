// import React from 'react';

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'default' | 'outline' | 'danger';
//   size?: 'sm' | 'md' | 'lg';
// }

// const Button: React.FC<ButtonProps> = ({ 
//   variant = 'default', 
//   size = 'md', 
//   children,
//   className = '',
//   ...props 
// }) => {
//   const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none';
  
//   const variantClasses = {
//     default: 'bg-indigo-600 text-white hover:bg-indigo-700',
//     outline: 'border border-gray-300 bg-transparent hover:bg-gray-50',
//     danger: 'bg-red-600 text-white hover:bg-red-700',
//   };
  
//   const sizeClasses = {
//     sm: 'h-8 px-3 text-sm',
//     md: 'h-10 px-4 py-2',
//     lg: 'h-12 px-6',
//   };

//   return (
//     <button
//       className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;