#!/bin/bash

# 创建Mac应用程序包脚本

# 设置变量
APP_NAME="不为清单"
APP_ID="com.nottodo.app"
APP_DIR="dist-electron/NotToDo.app"
CONTENTS_DIR="$APP_DIR/Contents"
MACOS_DIR="$CONTENTS_DIR/MacOS"
RESOURCES_DIR="$CONTENTS_DIR/Resources"
ELECTRON_DIR="$RESOURCES_DIR/app"

echo "🍎 创建Mac应用程序包..."

# 创建目录结构
mkdir -p "$MACOS_DIR"
mkdir -p "$RESOURCES_DIR"
mkdir -p "$ELECTRON_DIR"

# 复制Electron二进制文件
echo "📦 复制Electron二进制文件..."
cp -r node_modules/electron/dist/Electron.app "$APP_DIR"

# 复制应用文件
echo "📄 复制应用文件..."
cp -r dist/* "$ELECTRON_DIR/"
cp public/electron-fixed.js "$ELECTRON_DIR/"
cp public/preload.js "$ELECTRON_DIR/"

# 创建Info.plist
echo "📝 创建Info.plist..."
cat > "$CONTENTS_DIR/Info.plist" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDisplayName</key>
    <string>$APP_NAME</string>
    <key>CFBundleExecutable</key>
    <string>Electron</string>
    <key>CFBundleIconFile</key>
    <string>icon.icns</string>
    <key>CFBundleIdentifier</key>
    <string>$APP_ID</string>
    <key>CFBundleName</key>
    <string>$APP_NAME</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleVersion</key>
    <string>1.0.0</string>
    <key>LSMinimumSystemVersion</key>
    <string>10.13.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
    <key>NSSupportsAutomaticGraphicsSwitching</key>
    <true/>
</dict>
</plist>
EOF

# 创建应用图标（使用emoji作为临时图标）
echo "🎨 创建应用图标..."
sips -s format png data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚫</text></svg> --out "$RESOURCES_DIR/icon.png" 2>/dev/null || echo "使用默认图标"

# 创建简单的ICNS文件
iconutil -c icns "$RESOURCES_DIR/icon.png" -o "$RESOURCES_DIR/icon.icns" 2>/dev/null || echo "ICNS创建失败，使用默认图标"

# 设置权限
echo "🔐 设置权限..."
chmod +x "$MACOS_DIR/Electron"

echo "✅ Mac应用程序包创建完成！"
echo "📍 位置: $APP_DIR"
echo "🚀 运行: open $APP_DIR"