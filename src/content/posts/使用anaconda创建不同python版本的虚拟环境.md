---
title: '使用anaconda创建不同python版本的虚拟环境'
description: '本文介绍如何使用 Anaconda 创建和管理不同 Python 版本的虚拟环境，包括环境的创建、激活、第三方库的安装及验证方法，帮助用户高效进行 Python 开发与测试。'
pubDate: 2025-04-30
author: 'C_L1gh7'
tags: ['技术分享','日常生活']
---
# 创建虚拟环境
假设你希望创建一个python 3.13的虚拟环境，在命令行中输入：

```bash
conda create -n name python=3.13
```
其中，conda是命令前缀；create是指令创建一个环境；name是你为这个环境所起的名字；python=3.13是告诉程序你希望安装的python版本
![终端结果示意图](/pictures/posts/conda-env/6240fed7fd5049c7ba6ccabd5cce97c3.png)
当运行至此处时，按下y并回车继续
# 激活虚拟环境
创建该环境后，你需要将其激活。假如你希望在其中安装第三方库，这一步更是至关重要

```bash
conda activate name
```
激活该环境意味着接下来你在控制台的所有操作，都将针对刚刚你激活的虚拟环境进行。
# 安装第三方库
在激活的虚拟环境中，你可以使用 conda 或 pip 来安装第三方库。例如，安装 NumPy 和 Pandas：

```bash
# 使用 conda 安装库
conda install numpy pandas #安装numpy和pandas库
conda install -c conda-forge opencv #安装官方版本的opencv
conda install -c conda-forge opencv=4.x  # 包含所有贡献模块 替换4.x为具体版本号
# 或者使用 pip 安装库
pip install numpy panda
pip install opencv-python #安装官方版本的opencv
pip install opencv-contrib-python  # 包含所有贡献模块
```
# 验证安装

```bash
python -c "import numpy; print(numpy.__version__)" #验证numpy是否安装成功
python -c "import pandas; print(pandas.__version__)" #验证pandas是否安装成功
python -c "import cv2; print(cv2.__version__)" #验证opencv是否安装成功
```
