'use client'

import { useState, useEffect, createContext, useContext } from 'react'

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  icon?: string
}

interface NotificationContextType {
  showNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | null>(null)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const showNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification = {
      ...notification,
      id,
      duration: notification.duration || 3000
    }

    setNotifications(prev => [...prev, newNotification])

    // 自動移除通知
    setTimeout(() => {
      removeNotification(id)
    }, newNotification.duration)
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return (
    <NotificationContext.Provider value={{ showNotification, removeNotification }}>
      {children}
      <NotificationContainer notifications={notifications} onRemove={removeNotification} />
    </NotificationContext.Provider>
  )
}

interface NotificationContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

function NotificationContainer({ notifications, onRemove }: NotificationContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

interface NotificationItemProps {
  notification: Notification
  onRemove: (id: string) => void
}

function NotificationItem({ notification, onRemove }: NotificationItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const typeStyles = {
    success: 'border-green-500 bg-green-900',
    error: 'border-red-500 bg-red-900',
    warning: 'border-yellow-500 bg-yellow-900',
    info: 'border-blue-500 bg-blue-900'
  }

  const typeIcons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }

  useEffect(() => {
    // 進入動畫
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleRemove = () => {
    setIsExiting(true)
    setTimeout(() => {
      onRemove(notification.id)
    }, 300)
  }

  return (
    <div
      className={`
        nes-container is-rounded border-2 p-3 transition-all duration-300 cursor-pointer
        ${typeStyles[notification.type]}
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${isExiting ? 'translate-x-full opacity-0' : ''}
        hover:scale-105
      `}
      onClick={handleRemove}
    >
      <div className="flex items-start space-x-3">
        {/* 圖標 */}
        <div className="flex-shrink-0">
          <span className="text-xl">
            {notification.icon || typeIcons[notification.type]}
          </span>
        </div>

        {/* 內容 */}
        <div className="flex-1 min-w-0">
          <h4 className="pixel-text text-sm font-bold text-white mb-1">
            {notification.title}
          </h4>
          <p className="pixel-text text-xs text-gray-300 break-words">
            {notification.message}
          </p>
        </div>

        {/* 關閉按鈕 */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleRemove()
          }}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm">✕</span>
        </button>
      </div>

      {/* 進度條 */}
      <div className="mt-2 h-1 bg-gray-700 overflow-hidden">
        <div
          className="h-full bg-white animate-pulse"
          style={{
            animation: `notificationProgress ${notification.duration}ms linear forwards`
          }}
        />
      </div>
    </div>
  )
}

// 快捷通知 Hook
export const useQuickNotification = () => {
  const { showNotification } = useNotification()

  return {
    success: (title: string, message: string) =>
      showNotification({ type: 'success', title, message }),
    
    error: (title: string, message: string) =>
      showNotification({ type: 'error', title, message }),
    
    warning: (title: string, message: string) =>
      showNotification({ type: 'warning', title, message }),
    
    info: (title: string, message: string) =>
      showNotification({ type: 'info', title, message }),
    
    levelUp: (level: number) =>
      showNotification({
        type: 'success',
        title: '🎉 升級了！',
        message: `恭喜您升到 Level ${level}！`,
        icon: '🎯',
        duration: 5000
      }),
    
    taskComplete: (expGained: number) =>
      showNotification({
        type: 'success',
        title: '✅ 任務完成',
        message: `獲得 ${expGained} 經驗值！`,
        icon: '💰',
        duration: 3000
      })
  }
}

// CSS 動畫樣式
export default function NotificationStyles() {
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes notificationProgress {
        from { width: 100%; }
        to { width: 0%; }
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return null
}