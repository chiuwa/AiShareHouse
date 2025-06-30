'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // 模擬登入驗證
    if (username.trim() === '' || password.trim() === '') {
      setError('請輸入用戶名和密碼')
      setIsLoading(false)
      return
    }

    // 模擬 API 調用延遲
    setTimeout(() => {
      // 簡單的演示驗證（實際應用中應該調用後端 API）
      if (username && password) {
        // 登入成功
        localStorage.setItem('userLoggedIn', 'true')
        localStorage.setItem('userName', username)
        
        // 跳轉到電梯頁面
        router.push('/elevator')
      } else {
        setError('登入失敗，請檢查您的憑證')
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleBack = () => {
    router.push('/')
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

      {/* login.png 前景圖片 - 固定在頁面最下方 */}
      <div 
        style={{
          position: 'fixed',
          bottom: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          width: 'min(70vw, 600px)', // 響應式寬度，最大600px
          height: 'auto',
          animation: 'slideUpCard 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
        }}
      >
        <img 
          src="/login.png" 
          alt="Employee ID Card"
          style={{
            width: '100%',
            height: 'auto',
            imageRendering: 'pixelated'
          }}
        />
      </div>

      {/* 登入表單 - 採用 design.json 的 option_buttons 風格 */}
      <div style={{
        position: 'absolute',
        top: '35%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
        animation: 'fadeInForm 0.8s ease-out 0.6s both'
      }}>
        
        {/* 錯誤訊息 */}
        {error && (
          <div style={{
            width: '280px',
            backgroundColor: '#ff4444',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            fontSize: '12px',
            padding: '8px',
            textAlign: 'center',
            borderRadius: '4px',
            marginBottom: '8px'
          }}>
            {error}
          </div>
        )}
        
        {/* 用戶名輸入 - option_buttons 風格 */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="輸入員工編號"
          disabled={isLoading}
          style={{
            width: '280px',
            height: '40px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            fontSize: '16px',
            padding: '10px',
            fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            transition: 'all 0.2s',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = '#333333'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = '#000000'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)'
          }}
        />

        {/* 密碼輸入 - option_buttons 風格 */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="輸入密碼"
          disabled={isLoading}
          style={{
            width: '280px',
            height: '40px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            fontSize: '16px',
            padding: '10px',
            fontFamily: '"Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace',
            borderRadius: '4px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
            textAlign: 'center',
            transition: 'all 0.2s',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = '#333333'
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = '#000000'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)'
          }}
        />

        {/* 登入按鈕 - option_buttons 風格 */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            width: '280px',
            height: '40px',
            backgroundColor: isLoading ? '#666666' : '#000000',
            color: '#FFFFFF',
            border: '2px solid #FFFFFF',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
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
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#333333'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.6)'
            }
          }}
          onMouseOut={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#000000'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)'
            }
          }}
        >
          {isLoading ? '進入中...' : '拍卡進入'}
        </button>
      </div>

      {/* 動畫樣式 */}
      <style jsx>{`
        @keyframes slideUpCard {
          0% {
            transform: translateX(-50%) translateY(100%);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(-50%) translateY(0%);
            opacity: 1;
          }
        }
        
        @keyframes fadeInForm {
          0% {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateX(-50%);
          }
        }
        
        button:disabled {
          opacity: 0.7;
        }
        
        input:focus {
          outline: none;
          border-color: #333333 !important;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3) !important;
        }
        
        input::placeholder {
          color: #888888;
          opacity: 0.8;
        }
        
        @media (max-width: 768px) {
          div[style*="min(70vw, 600px)"] {
            width: min(90vw, 500px) !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="min(70vw, 600px)"] {
            width: min(95vw, 400px) !important;
          }
        }
      `}</style>
    </div>
  )
}