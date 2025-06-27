'use client'

import { useEffect, useState } from 'react'

interface ExperienceBarProps {
  currentExp: number
  maxExp: number
  level: number
  animated?: boolean
  showNumbers?: boolean
  height?: number
}

export default function ExperienceBar({ 
  currentExp, 
  maxExp, 
  level,
  animated = true,
  showNumbers = true,
  height = 20
}: ExperienceBarProps) {
  const [displayExp, setDisplayExp] = useState(0)
  const percentage = Math.min((currentExp / maxExp) * 100, 100)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayExp(currentExp)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setDisplayExp(currentExp)
    }
  }, [currentExp, animated])

  const displayPercentage = Math.min((displayExp / maxExp) * 100, 100)

  return (
    <div className="w-full">
      {/* 經驗值條容器 */}
      <div 
        className="relative bg-gray-800 border-2 border-white overflow-hidden"
        style={{ height: `${height}px`, imageRendering: 'pixelated' }}
      >
        {/* 經驗值填充 */}
        <div
          className="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-1000 ease-out relative"
          style={{ width: `${displayPercentage}%` }}
        >
          {/* 閃光效果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
        </div>

        {/* 等級顯示 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="pixel-text text-xs font-bold text-white text-shadow">
            LV.{level}
          </span>
        </div>
      </div>

      {/* 數值顯示 */}
      {showNumbers && (
        <div className="flex justify-between mt-1">
          <span className="pixel-text text-xs text-gray-400">EXP</span>
          <span className="pixel-text text-xs text-white">
            {displayExp} / {maxExp}
          </span>
        </div>
      )}

      {/* 進度百分比 */}
      <div className="text-center mt-1">
        <span className="pixel-text text-xs text-green-400">
          {displayPercentage.toFixed(1)}%
        </span>
      </div>
    </div>
  )
}