import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  icon,
}: ButtonProps) => {
  // Classes base
  const baseClasses =
    'rounded-lg font-medium transition-all duration-200 flex items-center justify-center'

  // Classes de variantes
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
    secondary: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
  }

  // Classes de tamanho
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
  }

  // Classes de largura
  const widthClasses = fullWidth ? 'w-full' : ''

  // Classes de estado
  const stateClasses = disabled || isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${stateClasses}`}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          <span>Carregando...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </div>
      )}
    </motion.button>
  )
}
