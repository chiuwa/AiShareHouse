# Next.js Hydration 錯誤修復

## 問題描述

出現 hydration 錯誤：
```
Text content does not match server-rendered HTML.
Server: "&quot;Zpix&quot;" 
Client: "Zpix"
```

## 根本原因

在 Next.js 中使用內聯 `<style>` 標籤時，服務器端渲染會將引號編碼為 HTML 實體 (`&quot;`)，但客戶端渲染時保持原始引號，導致內容不匹配。

## 解決方案

### 1. 移除內聯樣式
**之前 (錯誤)**:
```tsx
<style>{`
  html, body, pre, code, kbd, samp {
    font-family: "Zpix", "Press Start 2P", cursive;
  }
`}</style>
```

**之後 (正確)**:
```tsx
// 移除內聯樣式，改為在 CSS 文件中設定
```

### 2. 將樣式移至 CSS 文件

在 `src/app/globals.css` 中添加：
```css
/* NES.css 官方建議的全域字體設定 */
html, body, pre, code, kbd, samp {
  font-family: var(--retro-chinese-font);
  line-height: 1.6;
}
```

### 3. 移除所有內聯樣式

將所有 `style={{}}` 屬性改為 CSS 類別：

**之前**:
```tsx
<p style={{ fontFamily: 'Zpix', fontSize: '12px' }}>文字</p>
```

**之後**:
```tsx
<p className="font-zpix text-xs">文字</p>
```

## 最佳實踐

### ✅ 推薦做法
1. 所有樣式都放在 CSS 文件中
2. 使用 CSS 類別而非內聯樣式
3. 如果必須使用動態樣式，使用 `dangerouslySetInnerHTML`
4. 確保服務器端和客戶端渲染結果一致

### ❌ 避免做法
1. 在 Next.js 中使用內聯 `<style>` 標籤
2. 混用內聯樣式和 CSS 類別
3. 在組件中直接寫 CSS 字符串

## 檢查清單

- [x] 移除 layout.tsx 中的內聯 `<style>` 標籤
- [x] 將字體設定移至 globals.css
- [x] 移除組件中的內聯 `style={{}}` 屬性
- [x] 添加對應的 CSS 類別
- [x] 重新啟動開發服務器
- [x] 確認不再出現 hydration 錯誤

## 相關資源

- [Next.js Hydration 錯誤文檔](https://nextjs.org/docs/messages/react-hydration-error)
- [React Hydration 最佳實踐](https://react.dev/reference/react-dom/client/hydrateRoot)
- [CSS-in-JS vs CSS 文件的權衡](https://nextjs.org/docs/app/building-your-application/styling)

---

*修復完成日期: 2024年12月*