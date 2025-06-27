'use client'

import { ReactNode } from 'react'

interface PixelCardProps {
  title?: string
  children: ReactNode
  className?: string
  variant?: 'default' | 'dark' | 'primary' | 'success' | 'warning' | 'error'
  glowing?: boolean
}

export default function PixelCard({ 
  title, 
  children, 
  className = '',
  variant = 'default',
  glowing = false
}: PixelCardProps) {
  const baseClasses = 'nes-container with-title'
  
  const variantClasses = {
    default: 'is-rounded',
    dark: 'is-dark is-rounded',
    primary: 'is-primary is-rounded',
    success: 'is-success is-rounded',
    warning: 'is-warning is-rounded', 
    error: 'is-error is-rounded'
  }

  const glowClass = glowing ? 'animate-pulse shadow-lg shadow-blue-500/50' : ''

  return (
    <div 
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${glowClass}
        ${className}
      `}
    >
      {title && (
        <p className="title pixel-text">{title}</p>
      )}
      <div className="pixel-text">
        {children}
      </div>
    </div>
  )
}