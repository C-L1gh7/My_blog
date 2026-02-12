---
title: 'STM32CubeMX lost connection问题解决办法'
date: '2025-05-03'
tag: '技术分享'
excerpt: '本文介绍STM32CubeMX出现lost connection报错的原因及通过防火墙设置解决联网问题的方法。'
---
如题，笔者在尝试生成代码的时候出现了关键库缺失导致的报错。软件要求进行在线下载以解决。
当笔者点击download进行下载时，又弹出了需要登陆以完成下载的提示
当点击登陆时，软件跳出lost connection的报错。
## 解决办法
1. 检查自己网络连接是否正常
2. 如网络连接正常，按**win键**搜索**防火墙**。点击**Windows Defender 防火墙**
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection1.png" style="zoom: 33%;" />
1. 点击**高级设置**
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection2.png" style="zoom: 33%;" />
1. 选择**入站规则**
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection3.png" style="zoom:33%;" />
1. 点击右侧的**新建规则**
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection4.png" style="zoom:50%;" />
1. 选择**程序**，点击 **下一页**
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection5.png" style="zoom:33%;" />
1. 在这个页面选择STM32CubeMX.exe的路径，完成后点击**下一页**
	（这个路径是你软件安装的路径，不要照抄笔者图片里的设置）
	<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection6.png" style="zoom:33%;" />
1. 选择 **允许连接**
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection7.png" style="zoom:33%;" />
1. 直接单击**下一页**
 <img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection8.png" style="zoom:33%;" />
1.   这里的名称随便写，然后点击**完成**
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection9.png" style="zoom:33%;" />
1.   来到这个界面，点击**出站设置**，仿照之前的步骤设置完成
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/STM32CubeMX-lost-connection10.png" style="zoom:33%;" />
1.   回到CubeMX，应该就可以解决联网的问题了，如果不行的话，可以尝试离线安装。可以参考CSDN上其他人的文章

**如果这篇文章帮到你，希望你可以点个赞鼓励我一下~**