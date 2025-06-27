'use client'

import { useState } from 'react'
import PixelButton from './PixelButton'

interface Task {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  expReward: number
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

interface TaskCardProps {
  task: Task
  onComplete: (taskId: string) => void
  onEdit?: (taskId: string) => void
}

export default function TaskCard({ task, onComplete, onEdit }: TaskCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)

  const difficultyColors = {
    easy: 'bg-green-600',
    medium: 'bg-yellow-600', 
    hard: 'bg-red-600'
  }

  const priorityIcons = {
    low: '📝',
    medium: '⚡',
    high: '🔥'
  }

  const difficultyLabels = {
    easy: '簡單',
    medium: '中等',
    hard: '困難'
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    
    // 模擬完成動畫
    setTimeout(() => {
      onComplete(task.id)
      setIsCompleting(false)
    }, 1000)
  }

  return (
    <div className={`
      nes-container is-rounded relative transition-all duration-300
      ${task.completed ? 'opacity-75 bg-green-900' : 'bg-gray-800'}
      ${task.completed ? '' : 'hover:bg-gray-700'}
    `}>
      {/* 任務狀態標識 */}
      <div className="absolute -top-2 -right-2">
        {task.completed ? (
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs">✓</span>
          </div>
        ) : (
          <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-xs">{priorityIcons[task.priority]}</span>
          </div>
        )}
      </div>

      {/* 任務標題 */}
      <div className="flex items-center justify-between mb-3">
        <h3 className={`
          pixel-text text-sm font-bold
          ${task.completed ? 'line-through text-gray-400' : 'text-white'}
        `}>
          {task.title}
        </h3>
        
        {/* 難度標籤 */}
        <span className={`
          pixel-text text-xs px-2 py-1 rounded ${difficultyColors[task.difficulty]}
        `}>
          {difficultyLabels[task.difficulty]}
        </span>
      </div>

      {/* 任務描述 */}
      <p className={`
        pixel-text text-xs mb-4
        ${task.completed ? 'text-gray-500' : 'text-gray-300'}
      `}>
        {task.description}
      </p>

      {/* 獎勵資訊 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="pixel-text text-xs text-yellow-400">
            💰 +{task.expReward} EXP
          </span>
        </div>
        
        {/* 任務類型圖標 */}
        <div className="flex space-x-1">
          {Array.from({ length: task.difficulty === 'easy' ? 1 : task.difficulty === 'medium' ? 2 : 3 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-yellow-400" style={{ imageRendering: 'pixelated' }} />
          ))}
        </div>
      </div>

      {/* 操作按鈕 */}
      <div className="flex space-x-2">
        {!task.completed ? (
          <PixelButton
            variant="success"
            size="small"
            onClick={handleComplete}
            isLoading={isCompleting}
            className="flex-1"
          >
            {isCompleting ? '完成中...' : '完成任務'}
          </PixelButton>
        ) : (
          <div className="flex-1 text-center">
            <span className="pixel-text text-xs text-green-400">✨ 任務完成！</span>
          </div>
        )}
        
        {onEdit && (
          <PixelButton
            variant="normal"
            size="small"
            onClick={() => onEdit(task.id)}
          >
            編輯
          </PixelButton>
        )}
      </div>

      {/* 完成動畫效果 */}
      {task.completed && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="pixel-text text-yellow-400 animate-bounce">+{task.expReward} EXP!</span>
          </div>
        </div>
      )}
    </div>
  )
}