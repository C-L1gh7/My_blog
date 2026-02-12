---

title: 'PicGo插件无法安装，点击安装后过一会又开始安装：解决方案'

date: '2026-02-13'

tag: '技术分享'

excerpt: '本文介绍了在 Windows 系统中通过修改 config.xml 配置文件删除认证信息，从而重置 Syncthing Web 界面密码的方法。'

---

# PicGo插件无法安装，点击安装后过一会又开始安装：解决方案
## 问题缘起
在我使用PicGo的时候，尝试下载S3插件，但是点击安装后，往往等待一段时间，软件显示插件未安装
<figure>
   <img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/PicGo插件下载-step1.png" style="zoom: 80%;"/>
   <figcaption align="center">由于问题已经被我解决，现在已经可以正常安装插件，这里的图片只是对问题的复现，请大家忽略右侧的已安装</figcaption>
</figure>

## 解决问题
经过检查，发现日志中报错信息：PicGo 在尝试写入  `\node.js\node_cache` 文件夹时，由于该文件夹位于系统受保护的路径（Program Files）下，普通权限的程序无法直接修改其中的内容。
解决的办法如下：

1. 在文件资源管理器中定位到 `node.js\` 目录下
2. 找到 `node_cache` 文件夹，点击鼠标右键，选择 “属性”
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/PicGo插件下载-step2.png" />
3. 在弹出的窗口中切换到 “安全” 选项卡，点击下方的 “编辑” 按钮
<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/PicGo插件下载-step3.png" style="zoom: 67%;" />
4. 在“组或用户名”列表中，找到你当前登录的账号（通常是 Users 或你的用户名），在下方的“Users 的权限”框中，勾选 所有权限 的 “允许” 复选框【如果你找不到哪个是你登录的账号，就把这个列表里的所有用户全都赋予一遍权限吧】

<img src="https://pub-f15d478863f747a68de4bbf63631ccfe.r2.dev/PicGo/PicGo插件下载-step4.png" style="zoom:67%;" />

5. 依次点击 “确定” 保存设置
5. 重启PicGo即可
