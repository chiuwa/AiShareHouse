import { useState } from 'react'

interface PopupState {
  isOpen: boolean
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  showCancelButton?: boolean
  onConfirm?: () => void
}

/**
 * 彈窗管理 hook
 * 
 * @returns {object} 包含彈窗狀態和操作方法的對象
 */
export const usePopup = () => {
  const [popup, setPopup] = useState<PopupState>({
    isOpen: false,
    type: 'info',
    message: ''
  })

  const showPopup = (config: Omit<PopupState, 'isOpen'>) => {
    setPopup({
      ...config,
      isOpen: true
    })
  }

  const closePopup = () => {
    setPopup(prev => ({
      ...prev,
      isOpen: false
    }))
  }

  // 快捷方法
  const showSuccess = (message: string, title?: string, onConfirm?: () => void) => {
    showPopup({
      type: 'success',
      title: title || '成功',
      message,
      onConfirm
    })
  }

  const showError = (message: string, title?: string, onConfirm?: () => void) => {
    showPopup({
      type: 'error',
      title: title || '錯誤',
      message,
      onConfirm
    })
  }

  const showWarning = (message: string, title?: string, onConfirm?: () => void) => {
    showPopup({
      type: 'warning',
      title: title || '警告',
      message,
      onConfirm
    })
  }

  const showInfo = (message: string, title?: string, onConfirm?: () => void) => {
    showPopup({
      type: 'info',
      title: title || '提示',
      message,
      onConfirm
    })
  }

  const showConfirm = (
    message: string, 
    onConfirm: () => void,
    title?: string
  ) => {
    showPopup({
      type: 'warning',
      title: title || '確認',
      message,
      showCancelButton: true,
      onConfirm
    })
  }

  return {
    popup,
    showPopup,
    closePopup,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showConfirm
  }
} 