# 錯誤修復記錄

## 1. Tailwind CSS Hydration 錯誤

### 問題描述
```
Warning: Prop `className` did not match. 
Server: "w-3 h-3 bg-blue-500 animate-pulse" 
Client: "w-3 h-3 bg-blue-500 "
```

### 根本原因
在 `GameLoader.tsx` 中使用了 `Math.random()` 來決定是否添加 `animate-pulse` 類別：
```tsx
${Math.random() > 0.5 ? 'animate-pulse' : ''}
```

這導致服務器端和客戶端渲染結果不一致，因為 `Math.random()` 在兩邊會產生不同的值。

### 解決方案

#### 1. 移除隨機動畫
```tsx
// 之前 (錯誤)
} ${Math.random() > 0.5 ? 'animate-pulse' : ''}`}

// 之後 (正確)
}`}
```

#### 2. 添加穩定的 CSS 動畫
```css
.pixel-dot {
  animation: pixelFlicker 2s ease-in-out infinite;
}

@keyframes pixelFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```

#### 3. 使用確定性的類別名稱
```tsx
className={`w-3 h-3 pixel-dot ${
  i % 4 === 0 ? 'bg-blue-500' : 
  i % 4 === 1 ? 'bg-green-500' : 
  i % 4 === 2 ? 'bg-red-500' : 'bg-yellow-500'
}`}
```

## 2. Zpix 字體 404 錯誤

### 問題描述
```
https://cdn.jsdelivr.net/gh/SolidZORO/zpix-pixel-font@master/dist/Zpix.css
狀態碼: 404 Not Found
```

### 根本原因
jsDelivr CDN 上的 Zpix 字體路徑不正確或文件不存在。

### 解決方案

#### 1. 創建本地字體 CSS 文件
```css
/* public/fonts/zpix.css */
@font-face {
  font-family: 'Zpix';
  src: url('data:font/truetype;charset=utf-8;base64,') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

#### 2. 更新 layout.tsx
```tsx
{/* Zpix 字體 - 本地版本 */}
<link href="/fonts/zpix.css" rel="stylesheet" />
```

#### 3. 添加備用字體堆疊
```css
.zpix-fallback {
  font-family: "Zpix", "PingFang SC", "Microsoft YaHei", "SimHei", "Source Han Sans SC", "Noto Sans CJK SC", monospace;
}
```

## 最佳實踐

### ✅ 避免 Hydration 錯誤
1. **不要在渲染中使用隨機值**
   - `Math.random()`
   - `Date.now()`
   - 任何在服務器端和客戶端可能不同的值

2. **使用確定性的條件**
   - 基於 props 或 state 的條件
   - 基於索引或 ID 的條件
   - CSS 動畫而非 JavaScript 隨機

3. **處理動態內容**
   - 使用 `useEffect` 在客戶端設置動態值
   - 使用 `suppressHydrationWarning` (謹慎使用)
   - 將動態內容延遲到客戶端渲染

### ✅ 字體載入最佳實踐
1. **本地字體優於 CDN**
   - 更可靠的載入
   - 更好的性能
   - 避免 CORS 問題

2. **字體備用方案**
   - 提供多層字體堆疊
   - 使用 `font-display: swap`
   - 考慮載入失敗的情況

3. **性能優化**
   - 預載入關鍵字體
   - 使用適當的字體格式
   - 避免不必要的字體變體

## 檢查清單

- [x] 移除所有使用 `Math.random()` 的動態類別
- [x] 創建穩定的 CSS 動畫替代方案
- [x] 修復 Zpix 字體載入問題
- [x] 添加字體備用方案
- [x] 測試服務器端和客戶端渲染一致性
- [x] 確認不再出現 hydration 警告

## 相關資源

- [Next.js Hydration 錯誤文檔](https://nextjs.org/docs/messages/react-hydration-error)
- [React 18 Hydration 指南](https://react.dev/reference/react-dom/client/hydrateRoot)
- [CSS font-display 最佳實踐](https://web.dev/font-display/)

---

*修復完成日期: 2024年12月*  
*影響範圍: GameLoader.tsx, globals.css, layout.tsx*