'use client'

import { useState, useEffect } from 'react'

interface User {
  name: string
  avatar: string
}

interface GateEntranceProps {
  user: User
  onEnter: () => void
}

export default function GateEntrance({ user, onEnter }: GateEntranceProps) {
  const [gateStatus, setGateStatus] = useState<'closed' | 'opening' | 'open'>('closed')
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const messages = [
    `歡迎 ${user.name}！`,
    '正在驗證身份...',
    '驗證成功！',
    '請通過閘門'
  ]

  useEffect(() => {
    let messageIndex = 0
    const messageInterval = setInterval(() => {
      if (messageIndex < messages.length) {
        setWelcomeMessage(messages[messageIndex])
        messageIndex++
      } else {
        clearInterval(messageInterval)
        // 開始開閘動畫
        setTimeout(() => {
          setGateStatus('opening')
          setTimeout(() => {
            setGateStatus('open')
          }, 1000)
        }, 500)
      }
    }, 1500)

    return () => clearInterval(messageInterval)
  }, [user.name])

  const handleEnterGate = () => {
    if (gateStatus === 'open') {
      setIsProcessing(true)
      setTimeout(() => {
        onEnter()
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-4">
      {/* 公司標題 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: '"Press Start 2P"', fontSize: '24px' }}>
          🏢 AI SHAREHOUSE
        </h1>
        <p className="text-gray-600" style={{ fontFamily: '"Press Start 2P"', fontSize: '12px' }}>
          智慧分享屋入口
        </p>
      </div>

      {/* 閘機區域 */}
      <div className="relative mb-8">
        {/* 閘機主體 */}
        <div className="flex items-end justify-center space-x-4">
          {/* 左側閘機 */}
          <div className="gate-machine">
            <div className="gate-screen">
              <div className="screen-content">
                <div className="brain-icon">🧠</div>
                <div className="welcome-text">WELCOME</div>
              </div>
            </div>
            <div className="gate-body">
              <div className="gate-button">
                <div className="button-circle">
                  <span className="arrow-up">↑</span>
                </div>
              </div>
            </div>
          </div>

          {/* 中間閘門 */}
          <div className="gate-doors">
            <div className={`gate-door left ${gateStatus !== 'closed' ? 'open' : ''}`}>
              <div className="door-triangle"></div>
            </div>
            <div className={`gate-door right ${gateStatus !== 'closed' ? 'open' : ''}`}>
              <div className="door-triangle"></div>
            </div>
          </div>

          {/* 右側閘機 */}
          <div className="gate-machine">
            <div className="gate-screen">
              <div className="screen-content">
                <div className="brain-icon">🧠</div>
                <div className="welcome-text">WELCOME</div>
              </div>
            </div>
            <div className="gate-body">
              <div className="gate-button">
                <div className="button-circle">
                  <span className="arrow-up">↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 用戶角色 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
          <div className="user-avatar">
            <span style={{ fontSize: '24px' }}>{user.avatar}</span>
          </div>
        </div>
      </div>

      {/* AI 歡迎訊息 */}
      <div className="mb-6 w-full max-w-md">
        <div className="nes-container is-rounded bg-white border-4 border-black p-4">
          <div className="text-center">
            <div className="mb-2">
              <span style={{ fontSize: '16px' }}>🤖</span>
            </div>
            <p className="message-text">
              {welcomeMessage || '準備進入...'}
            </p>
          </div>
        </div>
      </div>

      {/* 進入按鈕 */}
      <div className="text-center">
        {gateStatus === 'open' ? (
          <button
            className="nes-btn is-success"
            onClick={handleEnterGate}
            disabled={isProcessing}
            style={{ fontSize: '14px', padding: '12px 24px' }}
          >
            {isProcessing ? '進入中...' : '🚪 進入辦公室'}
          </button>
        ) : (
          <div className="text-center">
            <p style={{ fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#666' }}>
              {gateStatus === 'opening' ? '閘門開啟中...' : '等待驗證...'}
            </p>
          </div>
        )}
      </div>

      {/* 8-bit 風格 CSS */}
      <style jsx>{`
        .gate-machine {
          width: 80px;
          height: 120px;
          background: #8B9DC3;
          border: 3px solid #000;
          position: relative;
          image-rendering: pixelated;
        }

        .gate-screen {
          width: 70px;
          height: 50px;
          background: #2E8B57;
          border: 2px solid #000;
          margin: 5px auto;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .screen-content {
          text-align: center;
          color: #00FF00;
        }

        .brain-icon {
          font-size: 14px;
          margin-bottom: 2px;
        }

        .welcome-text {
          font-family: "Press Start 2P";
          font-size: 6px;
          line-height: 1;
        }

        .gate-body {
          height: 60px;
          background: #A0A0A0;
          border-top: 2px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gate-button {
          width: 40px;
          height: 40px;
          background: #696969;
          border: 2px solid #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .button-circle {
          width: 30px;
          height: 30px;
          background: #2F4F2F;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .arrow-up {
          color: #00FF00;
          font-size: 16px;
          font-weight: bold;
        }

        .gate-doors {
          width: 60px;
          height: 80px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: flex-end;
        }

        .gate-door {
          width: 30px;
          height: 60px;
          background: #CD5C5C;
          border: 2px solid #000;
          position: absolute;
          bottom: 0;
          transition: transform 1s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gate-door.left {
          left: 0;
          transform-origin: left center;
        }

        .gate-door.right {
          right: 0;
          transform-origin: right center;
        }

        .gate-door.left.open {
          transform: rotateY(-90deg);
        }

        .gate-door.right.open {
          transform: rotateY(90deg);
        }

        .door-triangle {
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 15px solid #8B0000;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: #4169E1;
          border: 2px solid #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          image-rendering: pixelated;
        }

        .message-text {
          font-family: "Press Start 2P";
          font-size: 12px;
          line-height: 1.5;
          color: #000;
          min-height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 確保像素化效果 */
        * {
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
      `}</style>
    </div>
  )
}