'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [currentDialog, setCurrentDialog] = useState("您好，今日您有兩件重要任務，是否要先查看？")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  // 檢查登入狀態
  useEffect(() => {
    // 這裡可以檢查 localStorage、cookie 或其他登入狀態
    const loginStatus = localStorage.getItem('userLoggedIn') === 'true'
    setIsLoggedIn(loginStatus)
    
    if (loginStatus) {
      setShowDialog(true)
    }
  }, [])

  const handleOptionSelect = (optionId: string, optionText: string) => {
    setSelectedOption(optionId)
    
    // 根據選項設置對話內容
    switch(optionId) {
      case "1":
        // 拍卡進入 - 跳轉到登入頁面
        router.push('/login')
        break
      case "2":
        setShowDialog(true)
        setCurrentDialog("歡迎新同事！請先填寫基本資料，我們將為您安排入職流程。")
        break
      case "3":
        setShowDialog(true)
        setCurrentDialog("De. S&V 旗下項目")
        break
      default:
        setCurrentDialog("請選擇您需要的服務項目。")
    }
  }

  const handleDialogNext = () => {
    if (selectedOption === "1") {
      // 拍卡進入後的邏輯
      setCurrentDialog("系統已為您準備就緒，歡迎開始您的工作！")
      console.log("執行拍卡進入功能")
    } else if (selectedOption === "2") {
      // 新同事報到邏輯
      console.log("執行新同事報到功能")
      alert("正在開啟新同事報到表單...")
    } else if (selectedOption === "3") {
      // 關於我們邏輯
      console.log("顯示關於我們資訊")
      alert("顯示公司資訊...")
    } else {
      // 已登入用戶的日常對話
      setCurrentDialog("有什麼我可以幫助您的嗎？")
    }
    
    setSelectedOption(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn')
    setIsLoggedIn(false)
    setShowDialog(false)
    setCurrentDialog("您好，今日您有兩件重要任務，是否要先查看？")
  }

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
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }} />
      
      {/* 登出按鈕（僅在已登入時顯示） */}
      {isLoggedIn && (
        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(220, 38, 38, 0.8)',
            color: 'white',
            border: '2px solid #ef4444',
            padding: '8px 12px',
            fontSize: '8px',
            cursor: 'pointer',
            borderRadius: '4px',
            fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
            zIndex: 4
          }}
        >
          登出
        </button>
      )}

      {/* 未登入：顯示選項按鈕 */}
      {!isLoggedIn && (
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          alignItems: 'center',
          animation: 'fadeInScale 0.6s ease-out'
        }}>
          
          {/* 選項 1: 拍卡進入 */}
          <button
            onClick={() => handleOptionSelect("1", "拍卡進入")}
            style={{
              width: '280px',
              height: '40px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
              padding: '10px',
              margin: '8px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#333333'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#000000'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)'
            }}
          >
            拍卡進入
          </button>

          {/* 選項 2: 新同事報到 */}
          <button
            onClick={() => handleOptionSelect("2", "新同事報到")}
            style={{
              width: '280px',
              height: '40px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
              padding: '10px',
              margin: '8px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#333333'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#000000'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)'
            }}
          >
            新同事報到
          </button>

          {/* 選項 3: 關於我們 */}
          <button
            onClick={() => handleOptionSelect("3", "關於我們")}
            style={{
              width: '280px',
              height: '40px',
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '2px solid #FFFFFF',
              fontSize: '16px',
              cursor: 'pointer',
              fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
              padding: '10px',
              margin: '8px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#333333'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#000000'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)'
            }}
          >
            關於我們
          </button>
        </div>
      )}

      {/* 對話框區域（已登入或選擇選項後顯示） */}
      {showDialog && (
        <div 
          onClick={handleDialogNext}
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '800px',
            height: '100px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            fontSize: '14px',
            padding: '16px',
            zIndex: 3,
            borderRadius: '8px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.8)',
            cursor: 'pointer',
            animation: 'slideUpDialog 0.5s ease-out',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {/* 角色名稱 */}
          <div style={{
            color: '#00ff00',
            fontSize: '12px',
            marginBottom: '8px',
            fontWeight: 'bold'
          }}>
            小秘書
          </div>
          
          {/* 對話內容 */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            lineHeight: '1.4'
          }}>
            「{currentDialog}」
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
        
        @keyframes slideUpDialog {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          /* 手機版對話框調整 */
          div[style*="90%"] {
            width: 95% !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </div>
  )
}