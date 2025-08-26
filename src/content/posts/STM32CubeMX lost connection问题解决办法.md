---
title: 'STM32CubeMX lost connection问题解决办法'
description: '本文介绍STM32CubeMX出现lost connection报错的原因及通过防火墙设置解决联网问题的方法。'
pubDate: 2025-05-03
author: 'C_L1gh7'
tags: ['技术分享','日常生活']
---
如题，笔者在尝试生成代码的时候出现了关键库缺失导致的报错。软件要求进行在线下载以解决。
当笔者点击download进行下载时，又弹出了需要登陆以完成下载的提示
当点击登陆时，软件跳出lost connection的报错。
## 解决办法
1. 检查自己网络连接是否正常
2. 如网络连接正常，按**win键**搜索**防火墙**。点击**Windows Defender 防火墙**
![first](https://i-blog.csdnimg.cn/direct/d1bc141e1d7d4a669dc98738615cf0e6.png)
1. 点击**高级设置**
![](https://i-blog.csdnimg.cn/direct/2f2b65dd4d4b42618671e85debfefc41.png)
1. 选择**入站规则**
![](https://i-blog.csdnimg.cn/direct/5e6774d08f5142f4a6de5e3f9d3c62c5.png)
1. 点击右侧的**新建规则**
![](https://i-blog.csdnimg.cn/direct/aa3cc01b00e84b0aa3057b520886b80a.png)
1. 选择**程序**，点击 **下一页**
![](https://i-blog.csdnimg.cn/direct/0493c9fd0aaf4ccbbe4ad235533c91cf.png)
1. 在这个页面选择STM32CubeMX.exe的路径，完成后点击**下一页**
	（这个路径是你软件安装的路径，不要照抄笔者图片里的设置）
![](https://i-blog.csdnimg.cn/direct/da951b731f00402b923d79df1889a3fa.png)
1. 选择 **允许连接**
![](https://i-blog.csdnimg.cn/direct/de20765f8e3447b3afca17af913cfc0e.png)
1. 直接单击**下一页**
 ![](https://i-blog.csdnimg.cn/direct/a162238cd9a4412fa01ddd275d003a5c.png)
1.  这里的名称随便写，然后点击**完成**
 ![](https://i-blog.csdnimg.cn/direct/9e6286a115b64c5db974501b2d447b34.png)
1.  来到这个界面，点击**出站设置**，仿照之前的步骤设置完成
![](https://i-blog.csdnimg.cn/direct/cd571498824949eab5d76a788ff958cf.png)
1.  回到CubeMX，应该就可以解决联网的问题了，如果不行的话，可以尝试离线安装。可以参考CSDN上其他人的文章

**如果这篇文章帮到你，希望你可以点个赞鼓励我一下~**