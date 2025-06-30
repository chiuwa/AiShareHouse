'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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
}

export default function AboutUsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showDialog, setShowDialog] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 從 design.json 載入配置
  const [pageConfig, setPageConfig] = useState<Page | null>(null)
  const [character, setCharacter] = useState<Character | null>(null)
  const [styles, setStyles] = useState<any>(null)

  useEffect(() => {
    // 載入設計配置
    const loadConfig = async () => {
      try {
        console.log('About Us: 開始載入 design.json...')
        const response = await fetch('/design.json')
        console.log('About Us: Fetch response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const designData = await response.json()
        console.log('About Us: Design data loaded:', designData)
        
        const aboutUsPage = designData.pages?.about_us
        const receptionistCharacter = designData.characters?.['接待員']
        
        console.log('About Us: About us page config:', aboutUsPage)
        console.log('About Us: Receptionist character config:', receptionistCharacter)
        
        if (!aboutUsPage) {
          throw new Error('about_us page configuration not found in design.json')
        }
        
        if (!receptionistCharacter) {
          throw new Error('接待員 character configuration not found in design.json')
        }
        
        setPageConfig(aboutUsPage)
        setCharacter(receptionistCharacter)
        setStyles(designData.styles)
        setIsLoading(false)
        console.log('About Us: 配置載入成功！')
        
        // 延遲顯示對話框
        setTimeout(() => {
          setShowDialog(true)
        }, 800)
      } catch (error) {
        console.error('About Us: Failed to load design config:', error)
        console.error('About Us: Error details:', error instanceof Error ? error.message : String(error))
        setError(error instanceof Error ? error.message : String(error))
        setIsLoading(false)
      }
    }

    loadConfig()
  }, [])

  const handleBack = () => {
    router.push('/')
  }

  const handleDialogClick = () => {
    // 點擊對話框後跳回首頁
    router.push('/')
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

  const currentDialog = character.dialogs[pageConfig.default_dialog]

  return (
    <div className="bg-welcome" style={{
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
        background: 'rgba(0, 0, 0, 0.4)',
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



      {/* 公司資訊內容 */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '600px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#FFFFFF',
        border: '2px solid #FFFFFF',
        fontSize: '14px',
        padding: '24px',
        zIndex: 3,
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        animation: 'fadeInSlide 0.8s ease-out',
        lineHeight: '1.6'
      }}>
        
        <h2 style={{
          color: '#ffaa00',
          fontSize: '18px',
          marginBottom: '16px',
          textAlign: 'center',
          borderBottom: '2px solid #ffaa00',
          paddingBottom: '8px'
        }}>
         De. S&V AI 虛擬公司
        </h2>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '14px', marginBottom: '8px' }}>
            • 公司理念
          </h3>
          <p style={{ fontSize: '12px', marginLeft: '16px', color: '#cccccc' }}>
            將傳統辦公環境與虛擬公司AI 技術融合。
          </p>
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '14px', marginBottom: '8px' }}>
            • 服務項目
          </h3>
          <p style={{ fontSize: '12px', marginLeft: '16px', color: '#cccccc' }}>
            提供多樣化的 AI 助手服務，包含工作協作、任務管理、創意發想等功能。
          </p>
        </div>
        
      
        
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          padding: '12px',
          backgroundColor: 'rgba(255, 170, 0, 0.1)',
          border: '1px solid #ffaa00',
          borderRadius: '4px'
        }}>
          <p style={{ fontSize: '11px', color: '#ffaa00' }}>
            歡迎來到 De. S&V AI 虛擬公司
          </p>
        </div>
      </div>

      {/* 角色圖片 - 在對話框上方 */}
      {showDialog && pageConfig.show_character_image && (
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

      {/* 對話框 - 接待員介紹 */}
      {showDialog && (
        <div 
          onClick={handleDialogClick}
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
          
            {/* 返回提示區域 */}
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
                ← 點擊返回首頁
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 動畫樣式 */}
      <style jsx>{`
        @keyframes fadeInSlide {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
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
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }
        
        /* 手機版響應式 */
        @media (max-width: 768px) {
          div[style*="width: '80%'"] {
            width: 90% !important;
            top: 15% !important;
            font-size: 12px !important;
          }
          
          h2 {
            font-size: 16px !important;
          }
          
          h3 {
            font-size: 12px !important;
          }
          
          p {
            font-size: 10px !important;
          }
          
          div[style*="width: '90%'"] {
            width: 95% !important;
            height: 120px !important;
            font-size: 12px !important;
            bottom: 40px !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="width: '80%'"] {
            width: 95% !important;
            top: 10% !important;
            font-size: 11px !important;
            padding: 16px !important;
          }
          
          div[style*="width: '90%'"] {
            width: 98% !important;
            height: 140px !important;
            font-size: 11px !important;
            bottom: 30px !important;
          }
        }
      `}</style>
    </div>
  )
}