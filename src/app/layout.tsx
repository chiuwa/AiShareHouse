import './globals.css'
import type { Metadata } from 'next'
import { SoundProvider } from '@/components/ui/SoundManager'
import { NotificationProvider } from '@/components/ui/NotificationSystem'

export const metadata: Metadata = {
  title: '8-bit AI Sharehouse',
  description: 'Retro-style AI assistant for your daily tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head>
        {/* 按照 NES.css 官方建議的順序載入 */}
        <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
        <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />
        {/* Zpix 字體 - 本地版本 */}
        <link href="/fonts/zpix.css" rel="stylesheet" />
        

      </head>
      <body>
        <SoundProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </SoundProvider>
      </body>
    </html>
  )
}