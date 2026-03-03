# 不为清单 - Electron桌面应用

## 开发环境运行

```bash
# 安装依赖
npm install

# 启动开发模式（同时运行Vite和Electron）
npm run electron-dev
```

## 构建应用

```bash
# 构建所有平台
npm run electron-build

# 仅构建Windows版本
npm run electron-build-win

# 仅构建macOS版本
npm run electron-build-mac

# 仅构建Linux版本
npm run electron-build-linux
```

## 应用特性

- 跨平台支持（Windows、macOS、Linux）
- 原生文件对话框
- 快捷键支持
- 菜单栏集成
- 本地数据存储（IndexedDB）

## 快捷键

- `Cmd/Ctrl + E`: 导出数据
- `Cmd/Ctrl + I`: 导入数据
- `Cmd/Ctrl + Q`: 退出应用
- `Cmd/Ctrl + R`: 重新加载
- `F12`: 开发者工具

## 自定义图标

将512x512像素的PNG图标保存为 `public/icon.png`，然后重新构建应用。

## 发布

构建后的应用位于 `dist-electron` 文件夹中，可以分发给用户使用。