/**
 * 字體使用指南組件
 * 提供 NES.css 中文字體的最佳實踐範例
 */

import React from 'react';

interface FontExampleProps {
  className?: string;
  children: React.ReactNode;
  title: string;
  description: string;
}

const FontExample: React.FC<FontExampleProps> = ({ 
  className = '', 
  children, 
  title, 
  description 
}) => (
  <div className="nes-container with-title mb-4">
    <p className="title">{title}</p>
    <p className="chinese-small mb-2 text-gray-400">{description}</p>
    <div className={className}>
      {children}
    </div>
  </div>
);

export const FontGuide: React.FC = () => {
  return (
    <div className="retro-container">
      <h1 className="chinese-title mb-6">NES.css 中文字體使用指南</h1>
      
      {/* 英文內容 - 使用 Press Start 2P */}
      <FontExample
        title="English Content"
        description="使用 Press Start 2P 字體顯示英文內容"
        className="pixel-text"
      >
        <p>PRESS START</p>
        <p>Loading Game...</p>
        <p>Level: 42 | EXP: 1337</p>
      </FontExample>

      {/* 中文內容 - 使用 Zpix 像素字體 */}
      <FontExample
        title="Chinese Content with Zpix"
        description="使用 Zpix 像素字體顯示中文內容，完美的 8-bit 風格"
        className="chinese-text"
      >
        <p>歡迎來到 8-bit AI 共享屋</p>
        <p>您的虛擬助手已準備就緒</p>
        <p>開始您的數位冒險之旅</p>
        <p>像素字體讓遊戲更有復古感</p>
      </FontExample>

      {/* Zpix 字體大小測試 */}
      <FontExample
        title="Zpix Font Size Test"
        description="Zpix 字體在不同尺寸下的顯示效果"
      >
        <div className="space-y-2">
          <p style={{ fontFamily: 'Zpix', fontSize: '12px' }}>12px: 這是 Zpix 的最佳顯示尺寸</p>
          <p style={{ fontFamily: 'Zpix', fontSize: '14px' }}>14px: 稍大一些的 Zpix 字體</p>
          <p style={{ fontFamily: 'Zpix', fontSize: '16px' }}>16px: 更大的 Zpix 字體顯示</p>
          <p style={{ fontFamily: 'Zpix', fontSize: '10px' }}>10px: 較小的 Zpix 字體</p>
        </div>
      </FontExample>

      {/* 混合內容 */}
      <FontExample
        title="Mixed Content"
        description="中英文混合內容的最佳顯示效果"
        className="mixed-text"
      >
        <p>AI Assistant 智慧助手</p>
        <p>Status: 線上 | Level: 等級 5</p>
        <p>Welcome 歡迎使用我們的服務</p>
      </FontExample>

      {/* 標題樣式 */}
      <FontExample
        title="Chinese Titles"
        description="中文標題的推薦樣式"
        className="chinese-title"
      >
        <h2>系統設定</h2>
        <h3>用戶資料</h3>
        <h4>個人檔案</h4>
      </FontExample>

      {/* 按鈕文字 */}
      <FontExample
        title="Button Text"
        description="按鈕中的中文文字顯示"
      >
        <div className="flex gap-4 flex-wrap">
          <button className="nes-btn is-primary chinese-btn">開始遊戲</button>
          <button className="nes-btn is-success chinese-btn">儲存進度</button>
          <button className="nes-btn is-warning chinese-btn">設定選項</button>
          <button className="nes-btn is-error chinese-btn">離開遊戲</button>
        </div>
      </FontExample>

      {/* 小字體內容 */}
      <FontExample
        title="Small Text"
        description="小尺寸中文文字的可讀性優化"
        className="chinese-small"
      >
        <p>版權所有 © 2024 8-bit AI Sharehouse</p>
        <p>系統版本：v1.0.0 | 最後更新：2024年12月</p>
        <p>技術支援：support@example.com</p>
      </FontExample>

      {/* 使用建議 */}
      <div className="nes-container is-dark mt-6">
        <h3 className="chinese-title mb-4">字體使用建議</h3>
        <div className="chinese-text">
          <h4 className="mb-2">📝 CSS 類別使用指南：</h4>
          <ul className="list-disc list-inside space-y-1 chinese-small">
            <li><code>.pixel-text</code> - 英文內容和遊戲元素</li>
            <li><code>.chinese-text</code> - 純中文段落內容</li>
            <li><code>.mixed-text</code> - 中英文混合內容</li>
            <li><code>.chinese-title</code> - 中文標題</li>
            <li><code>.chinese-btn</code> - 按鈕中的中文文字</li>
            <li><code>.chinese-small</code> - 小尺寸中文文字</li>
          </ul>
          
          <h4 className="mt-4 mb-2">🎨 字體堆疊說明：</h4>
          <div className="chinese-small">
            <p><strong>Press Start 2P</strong> - 8-bit 英文字體</p>
            <p><strong>Zpix (最像素)</strong> - 專業中文像素字體，12px 完美顯示</p>
            <p><strong>PingFang SC</strong> - macOS 系統中文字體（備用）</p>
            <p><strong>Microsoft YaHei</strong> - Windows 系統中文字體（備用）</p>
            <p><strong>SimHei</strong> - 通用中文黑體（備用）</p>
          </div>
          
          <h4 className="mt-4 mb-2">✨ Zpix 字體特色：</h4>
          <div className="chinese-small">
            <p>• 支援繁體中文、簡體中文、日文和英文</p>
            <p>• 專為 12px 尺寸設計的像素完美字體</p>
            <p>• 包含 21,998 個字符，覆蓋率極高</p>
            <p>• 完美契合 8-bit 復古遊戲風格</p>
            <p>• 開源項目：<a href="https://github.com/SolidZORO/zpix-pixel-font" target="_blank" rel="noopener">github.com/SolidZORO/zpix-pixel-font</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FontGuide;