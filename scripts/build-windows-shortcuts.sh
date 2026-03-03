#!/bin/bash

# 创建Windows快捷方式脚本

echo "🪟 创建Windows快捷方式..."

# 创建快捷方式目录
mkdir -p dist-electron/windows

# 创建批处理文件
cat > dist-electron/windows/NotToDo.bat << EOF
@echo off
cd /d "%~dp0"
echo 启动不为清单应用...
start "" "http://localhost:3000"
echo 应用已在浏览器中打开
pause
EOF

# 创建VBS脚本用于创建桌面快捷方式
cat > dist-electron/windows/CreateShortcut.vbs << EOF
Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile = oWS.SpecialFolders("Desktop") & "\\不为清单.lnk"
Set oLink = oWS.CreateShortcut(sLinkFile)
oLink.TargetPath = "%~dp0NotToDo.bat"
oLink.WorkingDirectory = "%~dp0"
oLink.Description = "不为清单 - 通过记录不为事项，培养长期主义思维"
oLink.IconLocation = "%SystemRoot%\\System32\\shell32.dll,174"
oLink.Save
WScript.Echo "桌面快捷方式已创建: " & sLinkFile
EOF

# 创建安装脚本
cat > dist-electron/windows/install.bat << EOF
@echo off
echo 正在安装不为清单应用...
echo.
echo 1. 创建桌面快捷方式...
cscript //nologo CreateShortcut.vbs
echo.
echo 2. 安装完成！
echo.
echo 使用方法：
echo - 双击桌面上的"不为清单"快捷方式
echo - 或直接运行 NotToDo.bat
echo.
pause
EOF

echo "✅ Windows快捷方式创建完成！"
echo "📍 位置: dist-electron/windows/"
echo "🚀 运行: 双击 install.bat 进行安装"