/**
 * NES.css 正確使用方式指南
 * 基於官方文檔的最佳實踐
 */

import React from 'react';

export const NESUsageGuide: React.FC = () => {
  return (
    <div className="retro-container">
      <h1 className="chinese-title mb-6">NES.css 正確使用指南</h1>
      
      {/* 官方推薦的載入方式 */}
      <div className="nes-container with-title mb-6">
        <p className="title">📋 官方推薦載入順序</p>
        <div className="chinese-text">
          <p className="mb-4">根據 NES.css 官方文檔，正確的載入順序應該是：</p>
          <div className="nes-container is-dark">
            <pre className="chinese-small code-block">
{`<!-- 1. 先載入字體 -->
<link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">

<!-- 2. 再載入 NES.css -->
<link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />

<!-- 3. 設定字體 -->
<style>
  html, body, pre, code, kbd, samp {
    font-family: "您想使用的字體";
  }
</style>`}
            </pre>
          </div>
        </div>
      </div>

      {/* 多語言字體推薦 */}
      <div className="nes-container with-title mb-6">
        <p className="title">🌍 多語言字體推薦</p>
        <div className="chinese-text">
          <p className="mb-4">NES.css 社群推薦的各語言字體：</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="nes-container is-rounded">
              <h4 className="chinese-small mb-2">🔤 英文字體</h4>
              <ul className="chinese-small space-y-1">
                <li><strong>Press Start 2P</strong> (預設)</li>
                <li><strong>Kongtext</strong> (英文專用)</li>
              </ul>
            </div>
            
            <div className="nes-container is-rounded">
              <h4 className="chinese-small mb-2">🇯🇵 日文字體</h4>
              <ul className="chinese-small space-y-1">
                <li><strong>美咲フォント</strong></li>
                <li><strong>Nu もち</strong></li>
              </ul>
            </div>
            
            <div className="nes-container is-rounded">
              <h4 className="chinese-small mb-2">🇰🇷 韓文字體</h4>
              <ul className="chinese-small space-y-1">
                <li><strong>둥근모꼴</strong></li>
              </ul>
            </div>
            
            <div className="nes-container is-rounded">
              <h4 className="chinese-small mb-2">🇨🇳 中文字體</h4>
              <ul className="chinese-small space-y-1">
                <li><strong>Zpix (最像素)</strong> ⭐ 推薦</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 常見 NES.css 組件展示 */}
      <div className="nes-container with-title mb-6">
        <p className="title">🎮 NES.css 組件展示</p>
        <div className="space-y-4">
          
          {/* 按鈕組件 */}
          <div>
            <h4 className="chinese-small mb-2">按鈕 (Buttons)</h4>
            <div className="flex gap-2 flex-wrap">
              <button className="nes-btn">Normal</button>
              <button className="nes-btn is-primary">Primary</button>
              <button className="nes-btn is-success">Success</button>
              <button className="nes-btn is-warning">Warning</button>
              <button className="nes-btn is-error">Error</button>
            </div>
          </div>

          {/* 輸入框組件 */}
          <div>
            <h4 className="chinese-small mb-2">輸入框 (Input)</h4>
            <div className="nes-field">
              <label htmlFor="name_field" className="chinese-small">您的名字</label>
              <input type="text" id="name_field" className="nes-input" placeholder="請輸入..." />
            </div>
          </div>

          {/* 對話框組件 */}
          <div>
            <h4 className="chinese-small mb-2">對話框 (Dialog)</h4>
            <div className="nes-balloon from-left">
              <p className="chinese-text">這是一個 NES.css 對話框範例！</p>
            </div>
          </div>

          {/* 容器組件 */}
          <div>
            <h4 className="chinese-small mb-2">容器 (Container)</h4>
            <div className="nes-container with-title is-centered">
              <p className="title">標題容器</p>
              <p className="chinese-text">這是帶有標題的容器內容</p>
            </div>
          </div>

          {/* 進度條組件 */}
          <div>
            <h4 className="chinese-small mb-2">進度條 (Progress)</h4>
            <progress className="nes-progress is-primary" value="32" max="100"></progress>
          </div>
        </div>
      </div>

      {/* 最佳實踐建議 */}
      <div className="nes-container with-title mb-6">
        <p className="title">💡 最佳實踐建議</p>
        <div className="chinese-text">
          <div className="space-y-3">
            <div className="nes-container is-rounded">
              <h4 className="chinese-small mb-2">✅ 正確做法</h4>
              <ul className="chinese-small space-y-1 list-disc list-inside">
                <li>在 HTML head 中載入 NES.css，不要用 CSS @import</li>
                <li>先載入字體，再載入 NES.css</li>
                <li>使用 html, body 選擇器設定全域字體</li>
                <li>根據語言選擇合適的像素字體</li>
                <li>保持 12px 或其倍數的字體大小</li>
              </ul>
            </div>
            
            <div className="nes-container is-rounded">
              <h4 className="chinese-small mb-2">❌ 避免做法</h4>
              <ul className="chinese-small space-y-1 list-disc list-inside">
                <li>不要在 CSS 中使用 @import 載入 NES.css</li>
                <li>不要使用非整數倍的字體大小</li>
                <li>不要過度自訂 NES.css 的核心樣式</li>
                <li>不要混用多種像素字體在同一頁面</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 字體載入測試 */}
      <div className="nes-container with-title">
        <p className="title">🧪 字體載入測試</p>
        <div className="space-y-3">
          <div className="nes-container is-dark">
            <p className="font-press-start">
              Press Start 2P: The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="nes-container is-dark">
            <p className="font-zpix">
              Zpix: 快速的棕色狐狸跳過懶狗 1234567890
            </p>
          </div>
          <div className="nes-container is-dark">
            <p className="font-mixed">
              Mixed Font: Hello 你好 World 世界 123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NESUsageGuide;