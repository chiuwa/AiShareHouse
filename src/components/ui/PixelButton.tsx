'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'normal'
  size?: 'small' | 'medium' | 'large'
  children: ReactNode
  isLoading?: boolean
}

export default function PixelButton({ 
  variant = 'normal', 
  size = 'medium',
  children, 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: PixelButtonProps) {
  const baseClasses = 'nes-btn font-pixel transition-all duration-150'
  
  const variantClasses = {
    primary: 'is-primary',
    success: 'is-success', 
    warning: 'is-warning',
    error: 'is-error',
    normal: ''
  }

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-4 py-2', 
    large: 'text-base px-6 py-3'
  }

  const isDisabled = disabled || isLoading

  return (
    <button
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]}
        ${isDisabled ? 'is-disabled cursor-not-allowed' : 'hover:animate-pulse'}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <span className="animate-spin mr-2">⏳</span>
          載入中...
        </span>
      ) : (
        children
      )}
    </button>
  )
}