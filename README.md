# 🎮 8-Bit AI Sharehouse

一個結合懷舊 8-bit 遊戲風格與虛擬公司場景的 AI 應用系統。

## ✨ 特色功能

### 🎨 8-bit 復古風格
- **NES.css 整合**: 完整的 8-bit 像素風格 UI
- **Zpix 中文字體**: 專為像素風格設計的中文字體
- **像素動畫**: 流暢的 CSS 動畫效果
- **復古色彩**: 經典遊戲機配色方案

### 🏢 虛擬公司體驗
- **電梯系統**: 可選擇不同樓層，支援樓層狀態管理
- **員工入職**: 新同事報到流程
- **角色對話**: AI 密書與接待員角色互動
- **公司資訊**: 關於我們頁面展示

### 🤖 AI 角色助手
- **小秘書**: 電梯導引與樓層介紹
- **接待員**: 新員工報到與公司介紹
- **對話系統**: 8-bit 風格的對話介面
- **角色圖片**: 動畫角色顯示

### 🎮 遊戲化元素
- **登入系統**: 員工證風格的登入介面
- **樓層管理**: 修繕中/可用狀態切換
- **統一彈窗**: 8-bit 風格的訊息提示系統
- **響應式設計**: 支援桌面與手機版本

## 🛠 技術棧

- **前端框架**: Next.js 14 + TypeScript
- **樣式系統**: TailwindCSS + NES.css
- **動畫效果**: CSS Animations
- **狀態管理**: React Hooks
- **字體系統**: Zpix (中文) + Press Start 2P (英文)
- **部署平台**: Vercel

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 啟動開發服務器
```bash
npm run dev
```
開啟 [http://localhost:3000](http://localhost:3000) 查看結果。

### 構建生產版本
```bash
npm run build
npm start
```

## 📁 專案結構

```
src/
├── app/                     # Next.js App Router
│   ├── globals.css         # 全域樣式與響應式設定
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主頁面 (選項按鈕)
│   ├── login/              # 登入頁面
│   ├── elevator/           # 電梯選擇頁面
│   ├── new-employee/       # 新同事報到頁面
│   └── about-us/           # 關於我們頁面
├── components/             # React 組件
│   └── ui/                # UI 組件
│       └── PopupMessage.tsx # 統一彈窗組件
├── hooks/                  # 自定義 Hooks
│   └── usePopup.ts        # 彈窗管理 Hook
public/
├── design.json            # 設計配置檔案
├── fonts/                 # 字體檔案
│   ├── zpix.css
│   └── zpix.ttf
└── *.png                  # 場景圖片
```

## 🎨 核心組件

### PopupMessage
統一的 8-bit 風格彈窗組件，支援 success、error、warning、info 四種類型。

### usePopup Hook
彈窗狀態管理，提供 showSuccess、showError、showWarning、showInfo 等便捷方法。

## 📱 頁面功能

### 主頁面 (/)
- **未登入用戶**: 顯示三個選項按鈕（拍卡進入、新同事報到、關於我們）
- **已登入用戶**: 只顯示拍卡進入按鈕，直接跳轉電梯頁面

### 登入頁面 (/login)
- 員工證風格設計
- 底部滑入動畫效果
- 登入成功後跳轉主頁

### 電梯頁面 (/elevator)
- 樓層選擇功能
- 樓層狀態管理 (active/修繕中)
- 小秘書角色對話
- 樓層資訊彈窗

### 新同事報到 (/new-employee)
- 接待員角色引導
- 註冊表單功能
- 對話序列系統
- 成功註冊提示

### 關於我們 (/about-us)
- 公司資訊展示
- 接待員介紹
- 返回主頁功能

## 🌐 部署

### Vercel 部署

1. **安裝 Vercel CLI**
```bash
npm i -g vercel
```

2. **登入 Vercel**
```bash
vercel login
```

3. **部署到生產環境**
```bash
npm run build
vercel --prod
```

### 手動部署

1. **建置專案**
```bash
npm run build
```

2. **部署檔案**
將 `.next/` 目錄和相關檔案上傳到你的伺服器。

### 環境要求
- Node.js 18.17 或更高版本
- npm 或 yarn 套件管理器

## 🎯 設計配置

專案使用 `public/design.json` 統一管理：
- 頁面配置
- 角色設定
- 樣式定義
- 對話內容
- 動畫效果

## 🚧 開發進度

### ✅ 已完成
- [x] 8-bit UI 設計系統
- [x] 虛擬公司場景
- [x] 電梯樓層系統
- [x] 角色對話系統
- [x] 登入/註冊功能
- [x] 響應式設計
- [x] 統一彈窗系統
- [x] Vercel 部署

### 🔄 開發中
- [ ] 更多樓層頁面
- [ ] 角色互動功能
- [ ] 音效系統

### 📋 待開發
- [ ] 資料持久化
- [ ] 更多角色
- [ ] PWA 支援
- [ ] 多語言支援

## 📝 開發筆記

### 字體系統
- **中文**: Zpix 像素字體 (6.8MB)
- **英文**: Press Start 2P
- **備用**: PingFang SC, Microsoft YaHei

### 響應式設計
- **桌面版**: 80vw auto 背景圖片
- **手機版**: 120vw auto 背景圖片
- **按鈕尺寸**: 自動調整

## 🌍 線上演示

 [https://sharehouse-djqyiu0c9-chiuwas-projects.vercel.app](https://sharehouse-djqyiu0c9-chiuwas-projects.vercel.app)

## 📄 授權

MIT License

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

---

🎮 **歡迎來到 De. S&V AI 虛擬公司！** 🎮