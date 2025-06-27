'use client'

import { useState } from 'react'

interface PixelAvatarProps {
  avatar: string
  name?: string
  size?: 'small' | 'medium' | 'large'
  animated?: boolean
  glowing?: boolean
  onClick?: () => void
  className?: string
}

export default function PixelAvatar({ 
  avatar, 
  name,
  size = 'medium',
  animated = false,
  glowing = false,
  onClick,
  className = ''
}: PixelAvatarProps) {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-16 h-16 text-2xl',
    large: 'w-24 h-24 text-4xl'
  }

  const containerClasses = `
    ${sizeClasses[size]}
    relative border-2 border-white bg-gray-700 flex items-center justify-center
    transition-all duration-200 cursor-pointer
    ${animated ? 'hover:scale-110' : ''}
    ${glowing ? 'shadow-lg shadow-blue-500/50 animate-pulse' : ''}
    ${isHovered ? 'bg-blue-600 shadow-md' : ''}
    ${className}
  `

  return (
    <div className="flex flex-col items-center">
      <div
        className={containerClasses}
        style={{ imageRendering: 'pixelated' }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 主要頭像 */}
        <span className="select-none">{avatar}</span>
        
        {/* 狀態指示器 */}
        {glowing && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
        )}
        
        {/* 懸停效果 */}
        {isHovered && (
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse" />
        )}
      </div>

      {/* 名稱顯示 */}
      {name && (
        <span className="pixel-text text-xs mt-2 text-center max-w-20 truncate">
          {name}
        </span>
      )}
    </div>
  )
}