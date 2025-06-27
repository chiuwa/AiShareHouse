# 🎮 8-Bit AI Sharehouse

一個結合懷舊 8-bit 遊戲風格與現代 AI 技術的任務管理應用。

## ✨ 特色功能

### 🎨 8-bit 復古風格
- **NES.css 整合**: 完整的 8-bit 像素風格 UI
- **像素動畫**: 流暢的 CSS 動畫效果
- **復古音效**: 8-bit 風格的音效回饋（開發中）
- **懷舊色彩**: 經典遊戲機配色方案

### 🎯 遊戲化任務管理
- **經驗值系統**: 完成任務獲得 EXP
- **等級提升**: 持續使用提升用戶等級
- **任務分類**: 簡單、中等、困難三種難度
- **優先級管理**: 高、中、低優先級標示

### 🤖 AI 小秘書助手
- **智能提醒**: AI 助手提供個性化建議
- **對話介面**: 8-bit 風格的對話系統
- **每日簡報**: 重要事項自動整理

### 🎮 遊戲化元素
- **像素頭像**: 可自訂的 8-bit 角色
- **進度條**: 視覺化經驗值顯示
- **成就系統**: 完成任務解鎖成就（開發中）
- **音效系統**: 可控制的 8-bit 音效

## 🛠 技術棧

- **前端框架**: Next.js 14 + TypeScript
- **樣式系統**: TailwindCSS + NES.css
- **動畫效果**: Framer Motion + CSS Animations
- **音效引擎**: Howler.js（規劃中）
- **狀態管理**: React Hooks
- **開發工具**: ESLint + TypeScript

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 啟動開發服務器
```bash
npm run dev
```

### 構建生產版本
```bash
npm run build
npm start
```

## 📁 專案結構

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全域樣式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主頁面
├── components/            # React 組件
│   ├── ui/               # 可重用 UI 組件
│   │   ├── PixelButton.tsx
│   │   ├── PixelCard.tsx
│   │   ├── PixelAvatar.tsx
│   │   ├── ExperienceBar.tsx
│   │   ├── TaskCard.tsx
│   │   ├── SoundManager.tsx
│   │   └── NotificationSystem.tsx
│   ├── GameLoader.tsx     # 遊戲載入畫面
│   ├── LoginScreen.tsx    # 登入介面
│   ├── CompanyEntrance.tsx # 公司入口動畫
│   └── Dashboard.tsx      # 主控制台
```

## 🎨 UI 組件

### PixelButton
8-bit 風格按鈕，支援多種樣式和動畫效果。

### PixelCard
像素風格卡片容器，可設定不同主題色彩。

### ExperienceBar
經驗值進度條，支援動畫和數值顯示。

### TaskCard
任務卡片，包含難度、優先級、完成狀態等資訊。

### NotificationSystem
8-bit 風格的通知系統，支援多種通知類型。

## 🎵 音效系統

- **點擊音效**: 按鈕點擊回饋
- **成功音效**: 任務完成慶祝
- **升級音效**: 等級提升特效
- **錯誤音效**: 操作失敗提示
- **音量控制**: 可調節音效大小

## 🎮 遊戲機制

### 經驗值系統
- 完成簡單任務: +25 EXP
- 完成中等任務: +50 EXP  
- 完成困難任務: +100 EXP
- 每 100 EXP 升一級

### 用戶等級
- Level 1-5: 新手
- Level 6-10: 熟練
- Level 11-20: 專家
- Level 21+: 大師

## 🚧 開發進度

### ✅ 已完成
- [x] 8-bit UI 組件庫
- [x] 遊戲化任務系統
- [x] 經驗值與等級機制
- [x] 響應式設計
- [x] 音效控制介面
- [x] 通知系統

### 🔄 開發中
- [ ] Firebase 整合
- [ ] AI 對話功能
- [ ] 真實音效檔案
- [ ] 成就系統
- [ ] 數據持久化

### 📋 待開發
- [ ] 多語言支援
- [ ] 主題切換
- [ ] 社交功能
- [ ] 數據分析
- [ ] PWA 支援

## 🎯 使用場景

- **個人任務管理**: 日常工作任務追蹤
- **習慣養成**: 遊戲化的習慣建立
- **工作效率**: 提升工作動機與成就感
- **娛樂體驗**: 懷舊遊戲風格的使用體驗

## 📝 開發筆記

### 設計原則
1. **單一職責**: 每個組件只負責一個功能
2. **可重用性**: UI 組件高度模組化
3. **響應式**: 支援各種螢幕尺寸
4. **無障礙**: 考慮無障礙使用需求

### 效能優化
- 使用 Next.js 的圖片優化
- 組件懶載入
- CSS 動畫硬體加速
- 記憶體洩漏防護

## 📄 授權

MIT License - 請參考 LICENSE 文件

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

🎮 **讓工作變得有趣！** 🎮