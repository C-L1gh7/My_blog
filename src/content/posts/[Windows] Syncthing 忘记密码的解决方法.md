---
title: '[Windows] Syncthing 忘记密码的解决方法'
date: '2025-11-07'
tag: '技术分享'
excerpt: '本文介绍了在 Windows 系统中通过修改 config.xml 配置文件删除认证信息，从而重置 Syncthing Web 界面密码的方法。'
---
# [Windows] Syncthing 忘记密码的解决方法

## 通过修改配置文件重置密码

1. 进入Syncthing的配置文件目录，路径通常为：
`C:\Users\你的用户名\AppData\Local\Syncthing`

2. 找到并打开`config.xml`文件，使用文本编辑器编辑该文件。

3. 定位到以下两行内容：
	```xml
	<user>用户名</user>
	<password>密码哈希值</password>
	```
	将这两行完全删除。

	保存文件后，重新启动Syncthing服务，此时Web界面将不再需要密码验证。


**注意事项**

修改配置文件前请确保Syncthing已完全关闭。

如果找不到AppData目录，可能需要显示隐藏文件夹：
在文件资源管理器地址栏直接输入完整路径即可访问。

此方法会移除所有密码保护，建议重置后立即设置新密码。

[参考文章：syncthing忘记密码怎么办（Mac版）？](https://blog.csdn.net/qq_36894378/article/details/148896842)