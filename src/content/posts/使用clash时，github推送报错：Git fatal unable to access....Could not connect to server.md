---
title: '使用clash时，github推送报错：Git: fatal: unable to access....Could not connect to server'
date: '2025-11-08'
tag: '技术分享'
excerpt: '本文介绍了使用clash时github推送报错的解决方法'
---
## 原因分析

Git 设置了 HTTP(S) 代理，但代理程序没开 / 端口错了

Git 在使用 https:// 时，会遵循代理设置。

如果之前设置了代理（例如 Clash、V2Ray、Shadowrocket 等），但现在代理端口或软件没开，就会出现这个错误。
## 解决办法
### 1. 确认 Clash 的代理端口
打开 Clash for Windows 或 Clash Verge。

在主界面底部或设置中找到代理端口（一般是：）
```
HTTP: 7890
SOCKS5: 7891
```
如果不是 7890，请记下当前 HTTP 代理端口号。
### 2. 让 Git 走 Clash 的代理

打开命令行执行以下命令（假设 Clash 的 HTTP 端口是 7890）：
```
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```
⚠️ 注意：如果 Clash 显示的 HTTP 端口不是 7890，请改成实际端口号。
### 3. 重新推送，验证修复结果

## 希望以上经验可以帮到你！