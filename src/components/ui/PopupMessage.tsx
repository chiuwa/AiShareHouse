'use client'

import React from 'react'

interface PopupMessageProps {
  isOpen: boolean
  onClose: () => void
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  showOkButton?: boolean
  okText?: string
  showCancelButton?: boolean
  cancelText?: string
  onConfirm?: () => void
}

/**
 * 8-bit 風格統一彈窗組件
 * 
 * @param isOpen 是否顯示彈窗
 * @param onClose 關閉回調函數
 * @param type 彈窗類型：success | error | warning | info
 * @param title 標題
 * @param message 訊息內容
 * @param showOkButton 是否顯示確認按鈕
 * @param okText 確認按鈕文字
 * @param showCancelButton 是否顯示取消按鈕
 * @param cancelText 取消按鈕文字
 * @param onConfirm 確認回調函數
 */
export const PopupMessage: React.FC<PopupMessageProps> = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  showOkButton = true,
  okText = '確定',
  showCancelButton = false,
  cancelText = '取消',
  onConfirm
}) => {
  if (!isOpen) return null

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    onClose()
  }

  const getBorderColor = () => {
    switch (type) {
      case 'success': return '#00ff00'
      case 'error': return '#ff0000'
      case 'warning': return '#ffaa00'
      case 'info': return '#00ffff'
      default: return '#00ff00'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓'
      case 'error': return '✗'
      case 'warning': return '!'
      case 'info': return 'i'
      default: return 'i'
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      {/* 背景遮罩 */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />
      
      {/* 彈窗內容 */}
      <div 
        className="relative animate-bounce-in"
        style={{
          zIndex: 10000,
          backgroundColor: '#000000',
          color: '#FFFFFF',
          border: `2px solid ${getBorderColor()}`,
          borderRadius: '8px',
          padding: '24px',
          width: '98%',
          maxWidth: '600px',
          minWidth: '320px',
          minHeight: '150px',
          fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
          fontSize: '12px',
          lineHeight: '1.6',
          boxShadow: `0 0 20px ${getBorderColor()}40`
        }}
      >
        {/* 標題區域 */}
        {title && (
          <div className="flex items-center mb-4">
            <span 
              className="mr-2 text-lg"
              style={{ color: getBorderColor() }}
            >
              {getIcon()}
            </span>
            <h3 className="text-sm font-bold">{title}</h3>
          </div>
        )}

        {/* 訊息內容 */}
        <div className="mb-6">
          <p style={{ 
            whiteSpace: 'pre-wrap', 
            wordBreak: 'break-word',
            lineHeight: '1.6'
          }}>{message}</p>
        </div>

        {/* 按鈕區域 */}
        <div className="flex justify-end gap-3">
          {showCancelButton && (
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm border border-gray-400 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              style={{
                fontFamily: 'inherit',
                borderRadius: '6px',
                minWidth: '100px',
                fontWeight: 'bold'
              }}
            >
              {cancelText}
            </button>
          )}
          
          {showOkButton && (
            <button
              onClick={handleConfirm}
              className="px-6 py-3 text-sm transition-colors"
              style={{
                fontFamily: 'inherit',
                backgroundColor: getBorderColor(),
                color: '#000000',
                border: `2px solid ${getBorderColor()}`,
                borderRadius: '6px',
                minWidth: '100px',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000'
                e.currentTarget.style.color = getBorderColor()
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = getBorderColor()
                e.currentTarget.style.color = '#000000'
              }}
            >
              {okText}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          70% {
            transform: scale(0.9);
            opacity: 0.9;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-bounce-in {
          animation: bounce-in 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  )
} 