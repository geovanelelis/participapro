import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export const Card = ({ children, className = '' }: CardProps) => {
  return <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>{children}</div>
}

export const CardHeader = ({ children, className = '' }: CardProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

export const CardTitle = ({ children, className = '' }: CardProps) => {
  return <h3 className={`text-xl font-semibold text-gray-800 ${className}`}>{children}</h3>
}

export const CardDescription = ({ children, className = '' }: CardProps) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
}

export const CardContent = ({ children, className = '' }: CardProps) => {
  return <div className={`${className}`}>{children}</div>
}

export const CardFooter = ({ children, className = '' }: CardProps) => {
  return <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>
}
