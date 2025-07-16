import React from 'react'

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div className="relative z-50" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
}

export const DialogContent: React.FC<DialogContentProps> = ({ className, children }) => {
  return <div className={`bg-white p-6 rounded-lg shadow-lg ${className || ''}`}>{children}</div>
}

interface DialogHeaderProps {
  children: React.ReactNode
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => {
  return <div className="mb-4">{children}</div>
}

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

export const DialogTitle: React.FC<DialogTitleProps> = ({ className, children }) => {
  return <h2 className={`text-xl font-semibold text-gray-900 ${className || ''}`}>{children}</h2>
}

interface DialogDescriptionProps {
  className?: string
  children: React.ReactNode
}

export const DialogDescription: React.FC<DialogDescriptionProps> = ({ className, children }) => {
  return <p className={`text-sm text-gray-500 ${className || ''}`}>{children}</p>
}
