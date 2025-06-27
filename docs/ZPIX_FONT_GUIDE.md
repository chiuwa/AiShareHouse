# Zpix 字體整合指南

## 關於 Zpix (最像素)

[Zpix](https://github.com/SolidZORO/zpix-pixel-font) 是一個專門為中文設計的像素字體，完美適合 8-bit 風格的應用程式。

### 字體特色
- **名稱**: Zpix (最像素)
- **尺寸**: 12px (11px + 1px 間距)
- **字符數**: 21,998 個
- **支援語言**: 英文、繁體中文、簡體中文、日文
- **設計風格**: 像素完美的 8-bit 復古風格

## 整合方式

### 1. CDN 引入 (推薦)
```html
<link href="https://cdn.jsdelivr.net/gh/SolidZORO/zpix-pixel-font@master/dist/Zpix.css" rel="stylesheet" />
```

### 2. 本地安裝
```bash
# 下載字體檔案
wget https://github.com/SolidZORO/zpix-pixel-font/raw/master/dist/Zpix.ttf

# 或使用 git clone
git clone https://github.com/SolidZORO/zpix-pixel-font.git
```

### 3. CSS 字體堆疊設定
```css
:root {
  /* 純中文內容使用 Zpix */
  --chinese-font: "Zpix", "PingFang SC", "Microsoft YaHei", "SimHei", sans-serif;
  
  /* 混合內容 */
  --mixed-font: "Press Start 2P", "Zpix", "PingFang SC", "Microsoft YaHei", monospace;
}
```

## 使用建議

### 最佳顯示尺寸
- **12px**: 原生設計尺寸，顯示效果最佳
- **24px**: 2倍放大，保持像素完美
- **避免**: 13px, 15px 等非整數倍尺寸

### CSS 類別範例
```css
.zpix-text {
  font-family: "Zpix", sans-serif;
  font-size: 12px;
  line-height: 1.5;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.zpix-title {
  font-family: "Zpix", sans-serif;
  font-size: 24px;
  line-height: 1.2;
  image-rendering: pixelated;
}
```

## 授權資訊

### 免費使用
- ✅ 個人專案
- ✅ 教育用途
- ✅ 開源專案

### 商業使用
- 💰 單一商業產品: USD $1000 / RMB ¥7000
- 💰 多個商業產品: 需聯繫作者
- 📧 聯繫方式: solidzoro@live.com

## 技術細節

### 字體格式
- **TTF**: TrueType 格式，廣泛支援
- **BDF**: Bitmap Distribution Format
- **CSS**: Web 字體 CSS 檔案

### 瀏覽器支援
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ 行動裝置瀏覽器

### 渲染優化
```css
* {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
  text-rendering: optimizeSpeed;
  image-rendering: pixelated;
}
```

## 常見問題

### Q: 字體模糊或不清晰？
A: 確保使用 12px 或其整數倍，並設定 `image-rendering: pixelated`

### Q: 某些中文字符顯示不正確？
A: Zpix 包含 21,998 個字符，覆蓋率很高，但可能需要備用字體

### Q: 如何在 Next.js 中使用？
A: 參考本專案的 `layout.tsx` 和 `globals.css` 設定

## 相關連結

- 🏠 [官方 GitHub](https://github.com/SolidZORO/zpix-pixel-font)
- 🌐 [線上預覽](https://zpix.vercel.app/)
- 📦 [CDN 連結](https://cdn.jsdelivr.net/gh/SolidZORO/zpix-pixel-font@master/dist/)
- 💬 [問題回報](https://github.com/SolidZORO/zpix-pixel-font/issues)

---

*更新日期: 2024年12月*
*整合者: 8-bit AI Sharehouse 專案團隊*