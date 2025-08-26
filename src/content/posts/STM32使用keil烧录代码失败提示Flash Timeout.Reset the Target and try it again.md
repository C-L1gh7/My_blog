---
title: 'STM32使用keil烧录代码失败提示Flash Timeout.Reset the Target and try it again'
description: '本文介绍了在使用Keil烧录STM32时遇到Flash Timeout错误的解决方法，通过设置Erase Full Chip选项来恢复正常烧录流程。'
pubDate: 2025-05-04
author: 'C_L1gh7'
tags: ['技术分享','日常生活']
---
打开MDK Keil 然后依次点击：魔术棒—>Debug—>settings—>Flash Download，在Download Function这一功能栏里面把Erase Full Chip这一选项钩上，然后再随便烧录一个程序就行。Erase Full Chip是把Flash里面的内容全部擦除，自然把Flash里面用于读写锁定的程序擦了，然后就可以正常烧录程序了。

方法来源于b站用户RuningBackToYou
笔者亲测有效，分享给大家