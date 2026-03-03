# 不为清单金字塔 (Not-To-Do List Pyramid)

基于"不为清单"原则的视觉化工具，通过明确边界，减少人生绕路，积累长期正向价值。

## 🌟 核心功能

- **金字塔视觉化**：直观展示你的边界
- **分类管理**：工作、生活、成长三大类别
- **决策实验室**：记录十年决策，培养长期思维
- **进度追踪**：实时显示完成进度和分类统计
- **能量黑洞审计**：复盘历史失败，提炼"不为"准则
- **数据管理**：支持 JSON 备份/恢复，以及 Markdown 归档导出
- **黑暗模式**：默认黑暗主题，保护眼睛
- **响应式设计**：适配桌面与移动端
- **跨平台支持**：Web、Mac、Windows多平台

## 🚀 快速开始

### Web版本

1. **克隆仓库**：
   ```bash
   git clone https://github.com/sdlyingyong/Stop-Doing-List.git
   cd notodo/notodo
   ```

2. **安装依赖**：
   ```bash
   npm install
   ```

3. **启动开发服务器**：
   ```bash
   npm run dev
   ```

4. **访问应用**：
   在浏览器中打开 `http://localhost:3000`

### 桌面版本

#### Mac应用程序

```bash
# 构建Mac应用程序包
npm run build-mac-app

# 运行应用程序
open dist-electron/NotToDo.app
```

#### Windows快捷方式

```bash
# 构建Windows快捷方式
npm run build-win-shortcuts

# 运行安装脚本
cd dist-electron/windows
./install.bat
```

#### Electron开发版本

```bash
# 开发模式（推荐）
npm run electron-dev

# 生产模式
npm run electron-fixed
```

## 📊 功能详解

### 金字塔系统
- 21个不为事项，分为工作、生活、成长三大类
- 可视化进度条，实时追踪完成状态
- 智能分类统计，平衡发展

### 决策实验室
- 记录重要决策和十年视角
- 长期主义思维训练
- 决策复盘与反思

### 数据管理
- **导出格式**：Markdown、JSON
- **本地存储**：IndexedDB，安全可靠
- **跨设备同步**：支持导入导出

### 主题设置
- **黑暗模式**：默认开启，保护眼睛
- **语言切换**：中英文双语支持
- **响应式设计**：适配各种屏幕尺寸

## 🛠️ 技术栈

- **前端**：React 19 + TypeScript
- **构建工具**：Vite 6
- **样式**：Tailwind CSS 4
- **动画**：Motion (Framer Motion)
- **图标**：Lucide React
- **桌面应用**：Electron
- **存储**：IndexedDB

## 📱 使用指南

### 基础操作
1. **添加事项**：点击"+"按钮，选择类别
2. **编辑事项**：点击编辑图标，修改内容
3. **删除事项**：点击垃圾桶图标，确认删除
4. **查看进度**：顶部进度条显示完成状态

### 高级功能
1. **决策记录**：切换到决策实验室，记录重要决策
2. **数据导出**：点击导出按钮，选择格式
3. **主题切换**：设置中切换黑暗/浅色模式
4. **语言切换**：设置中切换中英文

## 🎯 设计理念

> **段永平**："不做不对的事情，比做对的事情更重要。"

不为清单金字塔基于这一理念，帮助用户：
- 明确个人边界，避免能量黑洞
- 培养长期主义思维
- 专注真正重要的事情
- 减少人生绕路

## 🔧 开发指南

### 项目结构
```
src/
├── components/          # 组件
│   ├── ProgressBar.tsx # 进度条组件
├── App.tsx             # 主应用
├── index.css           # 样式文件
public/
├── electron.js         # Electron主进程
├── electron-fixed.js   # 修复版Electron
├── preload.js          # 预加载脚本
scripts/
├── build-mac-app.sh    # Mac应用构建脚本
├── build-windows-shortcuts.sh # Windows快捷方式脚本
```

### 可用脚本
- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run electron-dev` - Electron开发模式
- `npm run electron-fixed` - Electron修复版
- `npm run build-mac-app` - 构建Mac应用
- `npm run build-win-shortcuts` - 构建Windows快捷方式
- `npm run test` - 运行测试

## 🐛 问题排查

### Electron沙盒问题
如果遇到沙盒权限问题，请参考 `ELECTRON-SANDBOX.md` 文档。

### 常见问题
1. **应用无法启动**：检查Node.js版本（建议18+）
2. **数据丢失**：检查浏览器是否允许IndexedDB
3. **样式错乱**：清除浏览器缓存

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 段永平 - "不为清单"理念
- Ray Dalio - 原则与反思
- Charlie Munger - 逆向思维
- 所有贡献者和用户

---

**不为清单金字塔** - 明确边界，专注成长，积累长期价值