'use client'

import { useEffect, useState, createContext, useContext } from 'react'

// 音效上下文
interface SoundContextType {
  playSound: (soundType: string) => void
  toggleMute: () => void
  isMuted: boolean
  volume: number
  setVolume: (volume: number) => void
}

const SoundContext = createContext<SoundContextType | null>(null)

// Hook for using sound context
export const useSound = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}

// 音效類型定義
const soundEffects = {
  click: '🔊',
  success: '✨',
  error: '❌',
  notification: '🔔',
  levelUp: '🎉',
  coin: '💰',
  typing: '⌨️'
}

interface SoundProviderProps {
  children: React.ReactNode
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)

  // 模擬 8-bit 音效播放（實際專案中會使用 Howler.js）
  const playSound = (soundType: string) => {
    if (isMuted) return

    // 這裡暫時用 Web Audio API 模擬 8-bit 音效
    // 實際應用中會載入真實的 8-bit 音效檔案
    console.log(`🎵 Playing ${soundType} sound at volume ${volume}`)
    
    // 視覺反饋
    const soundIcon = soundEffects[soundType as keyof typeof soundEffects] || '🔊'
    showSoundNotification(soundIcon)
  }

  const showSoundNotification = (icon: string) => {
    // 建立視覺音效提示
    const notification = document.createElement('div')
    notification.innerHTML = icon
    notification.className = 'fixed top-4 right-4 text-2xl animate-bounce z-50 pointer-events-none'
    notification.style.animation = 'soundNotification 1s ease-out forwards'
    
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 1000)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    playSound('click')
  }

  useEffect(() => {
    // 添加音效通知的 CSS 動畫
    const style = document.createElement('style')
    style.textContent = `
      @keyframes soundNotification {
        0% { 
          opacity: 1; 
          transform: translateY(0) scale(1); 
        }
        50% { 
          transform: translateY(-10px) scale(1.2); 
        }
        100% { 
          opacity: 0; 
          transform: translateY(-20px) scale(0.8); 
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <SoundContext.Provider value={{
      playSound,
      toggleMute,
      isMuted,
      volume,
      setVolume
    }}>
      {children}
    </SoundContext.Provider>
  )
}

// 音效控制面板組件
export default function SoundManager() {
  const { isMuted, volume, toggleMute, setVolume, playSound } = useSound()

  return (
    <div className="nes-container is-rounded bg-gray-800 p-3">
      <h4 className="pixel-text text-sm mb-3">🎵 音效設定</h4>
      
      <div className="space-y-3">
        {/* 靜音切換 */}
        <div className="flex items-center justify-between">
          <span className="pixel-text text-xs">音效:</span>
          <button
            className={`nes-btn ${isMuted ? 'is-error' : 'is-success'}`}
            onClick={toggleMute}
            style={{ fontSize: '10px', padding: '4px 8px' }}
          >
            {isMuted ? '🔇 靜音' : '🔊 開啟'}
          </button>
        </div>

        {/* 音量控制 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="pixel-text text-xs">音量:</span>
            <span className="pixel-text text-xs">{Math.round(volume * 100)}%</span>
          </div>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full"
            disabled={isMuted}
          />
        </div>

        {/* 音效測試 */}
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(soundEffects).slice(0, 4).map((soundType) => (
            <button
              key={soundType}
              className="nes-btn is-normal"
              onClick={() => playSound(soundType)}
              disabled={isMuted}
              style={{ fontSize: '8px', padding: '2px 4px' }}
            >
              {soundEffects[soundType as keyof typeof soundEffects]} {soundType}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}