'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PopupMessage } from '@/components/ui/PopupMessage'
import { usePopup } from '@/hooks/usePopup'

interface Character {
  role: string
  color: string
  image: {
    src: string
    position: string
    animation: string
    style: {
      width: string
      height: string
      position: string
      bottom: string
      left: string
      transform: string
      zIndex: number
      imageRendering: string
    }
    container_style: {
      position: string
      bottom: string
      left: string
      transform: string
      width: string
      display: string
      justifyContent: string
      alignItems: string
      zIndex: number
    }
  }
  dialogs: {
    [key: string]: string
  }
}

interface Page {
  character: string
  default_dialog: string
  show_character_image: boolean
  dialog_sequence: string[]
  show_signup_form?: boolean
}

export default function NewEmployeePage() {
  const router = useRouter()
  const { popup, showError, closePopup } = usePopup()
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0)
  const [showContinue, setShowContinue] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSignupForm, setShowSignupForm] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    email: '',
    preferredName: ''
  })
  
  // 從 design.json 載入配置
  const [pageConfig, setPageConfig] = useState<Page | null>(null)
  const [character, setCharacter] = useState<Character | null>(null)
  const [styles, setStyles] = useState<any>(null)

  useEffect(() => {
    // 載入設計配置
    const loadConfig = async () => {
      try {
        console.log('開始載入 design.json...')
        const response = await fetch('/design.json')
        console.log('Fetch response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const designData = await response.json()
        console.log('Design data loaded:', designData)
        
        const newEmployeePage = designData.pages?.new_employee
        const receptionistCharacter = designData.characters?.['接待員']
        
        console.log('New employee page config:', newEmployeePage)
        console.log('Receptionist character config:', receptionistCharacter)
        
        if (!newEmployeePage) {
          throw new Error('new_employee page configuration not found in design.json')
        }
        
        if (!receptionistCharacter) {
          throw new Error('接待員 character configuration not found in design.json')
        }
        
        setPageConfig(newEmployeePage)
        setCharacter(receptionistCharacter)
        setStyles(designData.styles)
        setIsLoading(false)
        console.log('配置載入成功！')
      } catch (error) {
        console.error('Failed to load design config:', error)
        console.error('Error details:', error instanceof Error ? error.message : String(error))
        setError(error instanceof Error ? error.message : String(error))
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [])

  useEffect(() => {
    // 顯示對話後延遲顯示繼續按鈕
    const timer = setTimeout(() => {
      setShowContinue(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [currentDialogIndex])

  const handleContinue = () => {
    console.log('handleContinue called')
    console.log('currentDialogIndex:', currentDialogIndex)
    console.log('dialog_sequence:', pageConfig?.dialog_sequence)
    console.log('current dialog:', pageConfig?.dialog_sequence[currentDialogIndex])
    
    if (pageConfig && currentDialogIndex < pageConfig.dialog_sequence.length - 1) {
      const newIndex = currentDialogIndex + 1
      setCurrentDialogIndex(newIndex)
      setShowContinue(false)
      
      // 檢查當前對話是否是註冊表單
      const currentDialog = pageConfig.dialog_sequence[newIndex]
      console.log('new dialog:', currentDialog)
      
      if (currentDialog === 'signup_form' && pageConfig.show_signup_form) {
        console.log('顯示註冊表單')
        setTimeout(() => {
          setShowSignupForm(true)
        }, 1500) // 延遲顯示表單
      }
    } else {
      // 檢查是否是最後一個對話且是註冊表單
      const currentDialog = pageConfig?.dialog_sequence[currentDialogIndex]
      if (currentDialog === 'signup_form' && pageConfig?.show_signup_form) {
        console.log('最後一個對話是註冊表單，顯示表單')
        setShowSignupForm(true)
        return
      }
      
      // 對話結束，跳轉回首頁
      console.log('對話結束，跳轉回首頁')
      router.push('/')
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  const handleSignupInputChange = (field: string, value: string) => {
    setSignupData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSignupSubmit = () => {
    // 驗證表單
    if (!signupData.username || !signupData.password || !signupData.email || !signupData.preferredName) {
      showError('請填寫所有必填欄位')
      return
    }

    // 簡單的 email 格式驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(signupData.email)) {
      showError('請輸入有效的 email 格式')
      return
    }

    // TODO: 實際的註冊邏輯
    console.log('註冊資料:', signupData)
    
    // 顯示 8-bit 風格成功 popup
    setShowSuccessPopup(true)
  }

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false)
    // 關閉 popup 後跳轉回首頁
    setTimeout(() => {
      router.push('/')
    }, 300) // 延遲一點讓動畫完成
  }

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
      }}>
        載入中...
      </div>
    )
  }

  if (!pageConfig || !character || !styles) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
      }}>
        {error ? error : '設定載入失敗'}
      </div>
    )
  }

  const currentDialog = character.dialogs[pageConfig.dialog_sequence[currentDialogIndex]]
  const isLastDialog = currentDialogIndex === pageConfig.dialog_sequence.length - 1

  return (
    <div className="bg-reception" style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
      imageRendering: 'pixelated'
    }}>
      
      {/* 背景遮罩 */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1
      }} />
      
      {/* 返回按鈕 */}
      <button
        onClick={handleBack}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          border: '2px solid #ffffff',
          padding: '8px 12px',
          fontSize: '8px',
          cursor: 'pointer',
          borderRadius: '4px',
          fontFamily: 'inherit',
          zIndex: 4
        }}
      >
        ← 返回
      </button>

      {/* 角色圖片 - 在對話框上方，當沒有對話框時隱藏 */}
      {pageConfig.show_character_image && !showSignupForm && (
        <div style={styles.character_image_container}>
          <img
            src={character.image.src}
            alt="接待員"
            style={{
              ...styles.character_image,
              animation: `${character.image.animation} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`
            }}
          />
        </div>
      )}

      {/* 對話框 - 根據 design.json 的 dialog_box 樣式 */}
      {!showSignupForm && (
        <div 
          onClick={handleContinue}
          style={{
            ...styles.dialog_box,
            animation: 'dialogSlideIn 0.6s ease-out',
            cursor: 'pointer'
          }}
        >
        
        {/* 對話內容區域 */}
        <div>
          {/* 角色名稱 */}
          <div style={{
            ...styles.character_name,
            color: character.color
          }}>
            接待員
          </div>
        
        {/* 對話內容 */}
        <div style={styles.dialog_content}>
          {currentDialog}
        </div>
        
          {/* 繼續提示區域 */}
          {showContinue && (
            <div style={{
              ...styles.continue_button_area,
              pointerEvents: 'none'
            }}>
              <div style={{
                ...styles.continue_button,
                fontFamily: 'inherit',
                pointerEvents: 'none',
                cursor: 'default'
              }}>
                {isLastDialog ? '✓ 點擊完成' : '► 點擊繼續'}
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {/* 進度指示器 */}
      <div style={{
        position: 'absolute',
        top: '30px',
        right: '30px',
        color: '#FFFFFF',
        fontSize: '10px',
        zIndex: 4,
        background: 'rgba(0, 0, 0, 0.6)',
        padding: '8px 12px',
        borderRadius: '4px',
        border: '1px solid #ffffff'
      }}>
        {currentDialogIndex + 1} / {pageConfig.dialog_sequence.length}
      </div>

      {/* 註冊表單 */}
      {showSignupForm && (
        <div style={styles.signup_form}>
          <input
            type="text"
            placeholder="使用者名稱"
            value={signupData.username}
            onChange={(e) => handleSignupInputChange('username', e.target.value)}
            style={{
              ...styles.signup_input,
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}
            onFocus={(e) => {
              Object.assign(e.target.style, styles.signup_input_focus)
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#FFFFFF'
              e.target.style.boxShadow = 'none'
            }}
          />
          
          <input
            type="password"
            placeholder="密碼"
            value={signupData.password}
            onChange={(e) => handleSignupInputChange('password', e.target.value)}
            style={{
              ...styles.signup_input,
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}
            onFocus={(e) => {
              Object.assign(e.target.style, styles.signup_input_focus)
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#FFFFFF'
              e.target.style.boxShadow = 'none'
            }}
          />
          
          <input
            type="email"
            placeholder="電子郵件"
            value={signupData.email}
            onChange={(e) => handleSignupInputChange('email', e.target.value)}
            style={{
              ...styles.signup_input,
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}
            onFocus={(e) => {
              Object.assign(e.target.style, styles.signup_input_focus)
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#FFFFFF'
              e.target.style.boxShadow = 'none'
            }}
          />
          
          <input
            type="text"
            placeholder="希望稱呼"
            value={signupData.preferredName}
            onChange={(e) => handleSignupInputChange('preferredName', e.target.value)}
            style={{
              ...styles.signup_input,
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}
            onFocus={(e) => {
              Object.assign(e.target.style, styles.signup_input_focus)
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#FFFFFF'
              e.target.style.boxShadow = 'none'
            }}
          />
          
          <button
            onClick={handleSignupSubmit}
            style={{
              ...styles.signup_button,
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}
            onMouseOver={(e) => {
              Object.assign(e.currentTarget.style, styles.signup_button_hover)
            }}
            onMouseOut={(e) => {
              Object.assign(e.currentTarget.style, styles.signup_button)
              e.currentTarget.style.fontFamily = '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}
          >
            完成註冊
          </button>
        </div>
      )}

      {/* 成功 Popup */}
      {showSuccessPopup && (
        <>
          {/* 背景遮罩 */}
          <div style={styles.success_popup_overlay} onClick={handleSuccessPopupClose} />
          
          {/* Popup 內容 */}
          <div style={styles.success_popup}>
            <div style={{
              ...styles.success_popup_title,
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}>
              ✓ 註冊成功！
            </div>
            
            <div style={{
              ...styles.success_popup_message,
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
            }}>
              歡迎加入 De. S&V AI 虛擬公司！<br />
              您的帳號已成功建立。
            </div>
            
            <button
              onClick={handleSuccessPopupClose}
              style={{
                ...styles.success_popup_button,
                fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
              }}
              onMouseOver={(e) => {
                Object.assign(e.currentTarget.style, styles.success_popup_button_hover)
              }}
              onMouseOut={(e) => {
                Object.assign(e.currentTarget.style, styles.success_popup_button)
                e.currentTarget.style.fontFamily = '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace'
              }}
            >
              確定
            </button>
          </div>
        </>
      )}

      {/* 動畫樣式 */}
      <style jsx>{`
        @keyframes dialogSlideIn {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        
        @keyframes popupSlideIn {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        /* 手機版響應式 */
        @media (max-width: 768px) {
          div[style*="width: '90%'"] {
            width: 95% !important;
            height: 120px !important;
            font-size: 12px !important;
            bottom: 40px !important;
          }
          
          /* 註冊表單手機版樣式 */
          input[style*="280px"] {
            width: 250px !important;
            height: 45px !important;
            font-size: 14px !important;
          }
          
          button[style*="280px"] {
            width: 250px !important;
            height: 45px !important;
            font-size: 14px !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="width: '90%'"] {
            width: 98% !important;
            height: 140px !important;
            font-size: 11px !important;
            bottom: 30px !important;
          }
          
          /* 註冊表單小螢幕樣式 */
          input[style*="280px"] {
            width: 220px !important;
            height: 40px !important;
            font-size: 12px !important;
          }
          
          button[style*="280px"] {
            width: 220px !important;
            height: 40px !important;
            font-size: 12px !important;
          }
        }
      `}</style>

      {/* 彈窗組件 */}
      <PopupMessage
        isOpen={popup.isOpen}
        onClose={closePopup}
        type={popup.type}
        title={popup.title}
        message={popup.message}
        showCancelButton={popup.showCancelButton}
        onConfirm={popup.onConfirm}
      />
    </div>
  )
}