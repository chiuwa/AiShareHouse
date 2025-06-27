# NES.css 最佳實踐指南

## 基於 Context7 官方文檔的正確使用方式

### 📚 官方文檔來源
- [NES.css GitHub](https://github.com/nostalgic-css/nes.css)
- [官方範例](https://nostalgic-css.github.io/NES.css/)

## 🔧 正確的載入順序

根據 NES.css 官方文檔，正確的載入順序是：

```html
<head>
  <!-- 1. 先載入字體 -->
  <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet">
  
  <!-- 2. 再載入 NES.css -->
  <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />
  
  <!-- 3. 設定全域字體 -->
  <style>
    html, body, pre, code, kbd, samp {
      font-family: "您想使用的字體";
    }
  </style>
</head>
```

## 🌍 多語言字體推薦

基於社群推薦的字體配置：

| 語言 | 推薦字體 | 說明 |
|------|----------|------|
| 預設 | Press Start 2P | NES.css 官方預設字體 |
| 英語 | Kongtext | 英文專用像素字體 |
| 日語 | 美咲フォント | 日文像素字體 |
| 日語 | Nu もち | 另一個日文選擇 |
| 韓語 | 둥근모꼴 | 韓文像素字體 |
| 中文 | **Zpix (最像素)** | ⭐ 最佳中文像素字體 |

## 🎯 本專案的字體配置

```css
:root {
  /* NES.css 推薦的多語言字體設定 */
  --nes-default-font: "Press Start 2P", cursive;
  --nes-english-font: "Kongtext", "Press Start 2P", cursive;
  --nes-japanese-font: "美咲フォント", "Nu もち", "Press Start 2P", cursive;
  --nes-korean-font: "둥근모꼴", "Press Start 2P", cursive;
  --nes-chinese-font: "Zpix", "Press Start 2P", cursive;
  
  /* 專案使用的字體變數 */
  --retro-pixel-font: var(--nes-default-font);
  --retro-chinese-font: var(--nes-chinese-font);
  --retro-mixed-font: "Zpix", "Press Start 2P", cursive;
}
```

## ✅ 最佳實踐

### 正確做法
1. **載入順序**: 字體 → NES.css → 自訂樣式
2. **字體設定**: 使用 `html, body` 選擇器設定全域字體
3. **CDN 使用**: 使用官方推薦的 unpkg CDN
4. **字體大小**: 保持 12px 或其整數倍
5. **語言適配**: 根據內容語言選擇合適字體

### 避免做法
1. ❌ 在 CSS 中使用 `@import` 載入 NES.css
2. ❌ 使用非整數倍的字體大小
3. ❌ 過度自訂 NES.css 核心樣式
4. ❌ 混用多種像素字體

## 🎮 常用組件

### 按鈕 (Buttons)
```html
<button class="nes-btn">Normal</button>
<button class="nes-btn is-primary">Primary</button>
<button class="nes-btn is-success">Success</button>
<button class="nes-btn is-warning">Warning</button>
<button class="nes-btn is-error">Error</button>
```

### 輸入框 (Input)
```html
<div class="nes-field">
  <label for="name">Name</label>
  <input type="text" id="name" class="nes-input">
</div>
```

### 容器 (Container)
```html
<div class="nes-container with-title">
  <p class="title">Title</p>
  <p>Content</p>
</div>
```

### 對話框 (Dialog)
```html
<div class="nes-balloon from-left">
  <p>Hello World!</p>
</div>
```

## 🧪 測試頁面

訪問以下頁面測試字體和組件效果：
- `/nes-guide` - NES.css 使用指南
- `/font-test` - 字體效果測試

## 📋 檢查清單

在部署前請確認：

- [ ] NES.css 載入順序正確
- [ ] 字體檔案可正常載入
- [ ] 中文字體使用 Zpix
- [ ] 英文字體使用 Press Start 2P
- [ ] 所有 NES.css 組件正常顯示
- [ ] 字體大小為 12px 的整數倍
- [ ] 響應式設計正常運作

## 🔗 相關資源

- [NES.css 官方文檔](https://github.com/nostalgic-css/nes.css)
- [Zpix 字體專案](https://github.com/SolidZORO/zpix-pixel-font)
- [Press Start 2P 字體](https://fonts.google.com/specimen/Press+Start+2P)
- [NES.css Storybook](https://nostalgic-css.github.io/NES.css/)

---

*最後更新: 2024年12月*  
*基於 NES.css 官方文檔和 Context7 查詢結果*