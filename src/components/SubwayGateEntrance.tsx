'use client'

import { useState, useEffect } from 'react'
import PixelButton from './ui/PixelButton'

export default function SubwayGateEntrance() {
  const [gateOpen, setGateOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [aiMessage, setAiMessage] = useState('歡迎來到 AI 共享屋')
  const [currentTime, setCurrentTime] = useState('')

  // 更新時間
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('zh-TW', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      }))
    }
    
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // AI 歡迎語輪播
  useEffect(() => {
    const messages = [
      '歡迎來到 AI 共享屋',
      '請選擇您的服務項目',
      'AI 小秘書為您服務',
      '8-bit 風格體驗'
    ]
    
    let index = 0
    const messageTimer = setInterval(() => {
      index = (index + 1) % messages.length
      setAiMessage(messages[index])
    }, 3000)
    
    return () => clearInterval(messageTimer)
  }, [])

  const handleGateClick = () => {
    setGateOpen(true)
    setTimeout(() => {
      setShowOptions(true)
    }, 800)
  }

  const handleOptionSelect = (option: string) => {
    console.log('Selected option:', option)
    // 這裡可以添加路由邏輯
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      
      {/* 背景裝飾 - 地鐵站氛圍 */}
      <div className="absolute inset-0">
        {/* 地板格線 */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-700 to-transparent opacity-30 floor-grid" />
        
        {/* 天花板 */}
        <div className="absolute top-0 w-full h-16 bg-gradient-to-b from-gray-600 to-transparent opacity-40" />
        
        {/* 側邊裝飾線 */}
        <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30" />
        <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30" />
      </div>

      {/* 主要閘口區域 */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        
        {/* 閘口容器 */}
        <div className="relative">
          
          {/* 左側閘機 */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-32">
            <div className="w-24 h-64 bg-gradient-to-b from-gray-400 to-gray-600 border-4 border-gray-300 relative pixel-gate">
              
              {/* 閘機螢幕 */}
              <div className="absolute top-8 left-2 right-2 h-16 bg-black border-2 border-green-400 flex items-center justify-center">
                <div className="text-green-400 text-xs chinese-text animate-pulse">
                  {currentTime}
                </div>
              </div>
              
              {/* 閘機指示燈 */}
              <div className={`absolute top-28 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                gateOpen ? 'bg-green-400 border-green-300' : 'bg-red-500 border-red-400'
              } animate-pulse`} />
              
              {/* 閘機底座 */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-500" />
            </div>
          </div>

          {/* 右側閘機 */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-32">
            <div className="w-24 h-64 bg-gradient-to-b from-gray-400 to-gray-600 border-4 border-gray-300 relative pixel-gate">
              
              {/* 閘機螢幕 */}
              <div className="absolute top-8 left-2 right-2 h-16 bg-black border-2 border-blue-400 flex items-center justify-center p-1">
                <div className="text-blue-400 text-xs chinese-text text-center leading-tight">
                  {aiMessage}
                </div>
              </div>
              
              {/* 閘機指示燈 */}
              <div className={`absolute top-28 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 ${
                gateOpen ? 'bg-green-400 border-green-300' : 'bg-red-500 border-red-400'
              } animate-pulse`} />
              
              {/* 閘機底座 */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-500" />
            </div>
          </div>

          {/* 中間閘門區域 */}
          <div className="relative w-48 h-64 flex items-center justify-center">
            
            {/* 閘門軌道 */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-yellow-400 border border-yellow-300" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-yellow-400 border border-yellow-300" />
            
            {/* 左側三角閘門 */}
            <div className={`absolute left-1/2 top-1/2 transform -translate-y-1/2 transition-all duration-800 ${
              gateOpen ? '-translate-x-20' : '-translate-x-4'
            }`}>
              <div 
                className="w-0 h-0 pixel-gate transform rotate-90"
                style={{
                  borderLeft: '16px solid transparent',
                  borderRight: '16px solid #ef4444',
                  borderBottom: '32px solid #dc2626'
                }}
              />
            </div>
            
            {/* 右側三角閘門 */}
            <div className={`absolute right-1/2 top-1/2 transform -translate-y-1/2 transition-all duration-800 ${
              gateOpen ? 'translate-x-20' : 'translate-x-4'
            }`}>
              <div 
                className="w-0 h-0 pixel-gate transform -rotate-90"
                style={{
                  borderLeft: '16px solid #ef4444',
                  borderRight: '16px solid transparent',
                  borderBottom: '32px solid #dc2626'
                }}
              />
            </div>
            
            {/* 中央觸發區域 */}
            {!gateOpen && (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handleGateClick}
              >
                <div className="text-white chinese-text text-sm bg-black bg-opacity-50 px-4 py-2 border border-white group-hover:bg-opacity-70 transition-all">
                  點擊進入
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 底部對話區域 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-gray-900 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          
          {/* AI 對話框 */}
          <div className="nes-balloon from-left mb-4">
            <p className="chinese-text text-sm">
              🤖 您好！我是 AI 小秘書，歡迎來到 8-bit 共享屋。請選擇您需要的服務。
            </p>
          </div>
          
          {/* 選項彈出區域 */}
          {showOptions && (
            <div className="flex justify-center space-x-4 slide-in-bottom">
              <PixelButton
                variant="primary"
                onClick={() => handleOptionSelect('chat')}
                className="chinese-text"
              >
                💬 AI 對話
              </PixelButton>
              
              <PixelButton
                variant="success"
                onClick={() => handleOptionSelect('workspace')}
                className="chinese-text"
              >
                🏠 工作空間
              </PixelButton>
              
              <PixelButton
                variant="warning"
                onClick={() => handleOptionSelect('settings')}
                className="chinese-text"
              >
                ⚙️ 設定
              </PixelButton>
              
              <PixelButton
                variant="error"
                onClick={() => handleOptionSelect('help')}
                className="chinese-text"
              >
                ❓ 說明
              </PixelButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}