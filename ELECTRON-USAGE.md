# 不为清单 Electron 应用使用指南

## 快速开始

### 方法1：开发模式（推荐）
```bash
npm run electron-dev
```
这会同时启动Vite开发服务器和Electron应用。

### 方法2：生产模式
```bash
# 先构建Web应用
npm run build

# 然后启动Electron
npx electron public/electron.js
```

## 常见问题

### 1. 如果遇到沙盒权限错误
确保electron.js中有以下配置：
```javascript
webPreferences: {
  sandbox: false // 禁用沙盒
}
```

### 2. 如果应用窗口不显示
检查控制台是否有错误信息，可能是路径问题。

### 3. 如果热重载不工作
确保开发服务器正在运行在 http://localhost:3000

## 应用功能

- 🖥️ 跨平台桌面应用（Windows、macOS、Linux）
- 📁 原生文件对话框（导入/导出）
- ⌨️ 快捷键支持（Cmd/Ctrl+E 导出等）
- 📱 响应式设计，适配各种屏幕尺寸
- 💾 本地数据存储（IndexedDB）

## 快捷键

- `Cmd/Ctrl + E` - 导出数据
- `Cmd/Ctrl + I` - 导入数据
- `Cmd/Ctrl + Q` - 退出应用

## 构建分发版

```bash
# 构建所有平台
npm run electron-build

# 构建特定平台
npm run electron-build-mac    # macOS
npm run electron-build-win    # Windows
npm run electron-build-linux  # Linux
```

构建后的应用位于 `dist-electron` 文件夹中。