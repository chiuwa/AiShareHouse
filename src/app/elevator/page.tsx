'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PopupMessage } from '@/components/ui/PopupMessage'
import { usePopup } from '@/hooks/usePopup'

interface Floor {
  id: string
  name: string
  description: string
  active: boolean
}

interface Character {
  role: string
  color: string
  image: {
    src: string
    position: string
    animation: string
    style: any
  }
  dialogs: {
    [key: string]: string
  }
}

interface ElevatorPage {
  character: string
  backgroundImage: string
  default_dialog: string
  show_character_image: boolean
  show_floor_selection: boolean
  floors: Floor[]
}

export default function ElevatorPage() {
  const router = useRouter()
  const { popup, showInfo, showWarning, closePopup } = usePopup()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [currentDialog, setCurrentDialog] = useState('')
  const [showFloorSelection, setShowFloorSelection] = useState(false)
  
  // 從 design.json 載入配置
  const [pageConfig, setPageConfig] = useState<ElevatorPage | null>(null)
  const [character, setCharacter] = useState<Character | null>(null)
  const [styles, setStyles] = useState<any>(null)

  useEffect(() => {
    // 檢查登入狀態
    const loginStatus = localStorage.getItem('userLoggedIn') === 'true'
    if (!loginStatus) {
      router.push('/login')
      return
    }

    // 載入設計配置
    const loadConfig = async () => {
      try {
        console.log('開始載入 design.json...')
        const response = await fetch('/design.json')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const designData = await response.json()
        console.log('Design data loaded:', designData)
        
        const elevatorPage = designData.pages?.elevator
        const secretaryCharacter = designData.characters?.['小秘書']
        
        console.log('Elevator page config:', elevatorPage)
        console.log('Secretary character config:', secretaryCharacter)
        
        if (!elevatorPage) {
          throw new Error('elevator page configuration not found in design.json')
        }
        
        if (!secretaryCharacter) {
          throw new Error('小秘書 character configuration not found in design.json')
        }
        
        setPageConfig(elevatorPage)
        setCharacter(secretaryCharacter)
        setStyles(designData.styles)
        setCurrentDialog(secretaryCharacter.dialogs[elevatorPage.default_dialog])
        setIsLoading(false)
        
        // 延遲顯示對話框
        setTimeout(() => {
          setShowDialog(true)
          setTimeout(() => {
            setShowFloorSelection(true)
          }, 2000)
        }, 500)
        
        console.log('配置載入成功！')
      } catch (error) {
        console.error('Failed to load design config:', error)
        setError(error instanceof Error ? error.message : String(error))
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [router])

  const handleFloorSelect = (floor: Floor) => {
    // 檢查樓層是否可用
    if (!floor.active) {
      showWarning(
        `${floor.name} 正在修繕中，暫時無法前往。`,
        '樓層暫不可用'
      )
      return
    }

    console.log('選擇樓層:', floor)
    setShowFloorSelection(false)
    setShowDialog(false)
    
    // 顯示樓層資訊
    showInfo(
      `正在前往 ${floor.name}\n- ${floor.description}`,
      '電梯運行中',
      () => {
        // 這裡可以跳轉到具體的樓層頁面
        console.log(`跳轉到 ${floor.id} 樓層`)
        // router.push(`/floor/${floor.id}`)
      }
    )
  }

  const handleBack = () => {
    router.push('/')
  }

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 阻止事件冒泡
    if (!showFloorSelection) {
      setCurrentDialog(character?.dialogs['elevator_selection'] || '')
      setTimeout(() => {
        setShowFloorSelection(true)
      }, 1000)
    }
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

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
      imageRendering: 'pixelated',
      backgroundImage: `url(${pageConfig.backgroundImage})`,
      backgroundSize: '80vw auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#000'
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

      {/* 樓層選擇區域 */}
      {showFloorSelection && (
        <div style={{
          ...styles.elevator_floor_selection,
          animation: 'fadeInScale 0.6s ease-out'
        }}>
          <h2 style={{
            color: '#00ff00',
            fontSize: '18px',
            marginBottom: '20px',
            textAlign: 'center',
            textShadow: '0 0 10px rgba(0, 255, 0, 0.5)'
          }}>
            請選擇樓層
          </h2>
          
          {pageConfig.floors.map((floor) => (
            <button
              key={floor.id}
              onClick={() => handleFloorSelect(floor)}
              style={{
                ...(floor.active ? styles.elevator_floor_button : styles.elevator_floor_button_disabled),
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                if (floor.active) {
                  Object.assign(e.currentTarget.style, styles.elevator_floor_button_hover)
                }
              }}
              onMouseLeave={(e) => {
                if (floor.active) {
                  Object.assign(e.currentTarget.style, styles.elevator_floor_button)
                  e.currentTarget.style.fontFamily = 'inherit'
                } else {
                  Object.assign(e.currentTarget.style, styles.elevator_floor_button_disabled)
                  e.currentTarget.style.fontFamily = 'inherit'
                }
              }}
            >
              <div style={styles.elevator_floor_name}>
                {floor.active ? floor.name : `${floor.name} (修繕中)`}
              </div>
              <div style={styles.elevator_floor_description}>
                {floor.active ? floor.description : '暫時無法使用'}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 角色圖片 - 只在對話時顯示，有選擇時隱藏 */}
      {pageConfig.show_character_image && showDialog && !showFloorSelection && (
        <img
          src={character.image.src}
          alt="小秘書"
          style={{
            ...character.image.style,
            imageRendering: 'pixelated',
            animation: `${character.image.animation} 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards`
          }}
        />
      )}

      {/* 對話框 */}
      {showDialog && !showFloorSelection && (
        <div 
          onClick={handleDialogClick}
          style={{
            ...styles.dialog_box,
            animation: 'dialogSlideIn 0.6s ease-out',
            cursor: 'pointer'
          }}
        >
          {/* 角色名稱 */}
          <div style={{
            ...styles.character_name,
            color: character.color
          }}>
            小秘書
          </div>
          
          {/* 對話內容 */}
          <div style={styles.dialog_content}>
            {currentDialog}
          </div>
          
          {/* 繼續提示 */}
          <div style={{
            textAlign: 'right',
            fontSize: '10px',
            color: '#cccccc',
            marginTop: '8px'
          }}>
            點擊繼續 ▶
          </div>
        </div>
      )}

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

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
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
        
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        /* 手機版響應式 */
        @media (max-width: 768px) {
          div[style*="80vw auto"] {
            background-size: 120vw auto !important;
          }
          
          /* 樓層按鈕手機版調整 */
          button[style*="320px"] {
            width: 280px !important;
            height: 45px !important;
            font-size: 13px !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="80vw auto"] {
            background-size: 120vw auto !important;
          }
          
          /* 樓層按鈕小螢幕調整 */
          button[style*="320px"] {
            width: 250px !important;
            height: 40px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  )
} 