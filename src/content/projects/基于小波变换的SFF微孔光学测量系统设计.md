---
title: "光电设计竞赛(国三)-基于小波变换的SFF微孔光学测量系统设计"
date: "2025-08-21"

technologies: ["Python", "OpenCV", "NumPy", "STM32", "Matlab"]
codeUrl: "https://github.com/C-L1gh7/micro-hole-measurement.git"
docsUrl: "/docs/基于小波变换的SFF微孔光学测量系统设计.pdf"
videoUrl: "https://www.bilibili.com/video/BV1CugwznEwc"
---

**项目简介**：基于电子显微镜与电动位移平台，结合 STM32 控制系统，开发了一套用于大深径比微孔形貌参数测量的自动化系统，**单次测量即可得到形貌参数、三维重建和全景深合成图**。 针对赛题要求的不锈钢样品中孔径 0.1–0.3 mm、深径比 3–10 的微孔，构建了基于 SFF（Shape from Focus）与小波变换的测量算子，实现亚微米级精度，21°C 实验室条件下相对误差约为 0.05%。系统可自动完成扫描、聚焦及数据处理的全流程操作，单次测量平均耗时约 43 秒。在减少人工干预的同时，有效降低读数误差，整体表现出良好的稳定性与重复性。

**负责工作**：以队长身份参与全部工作，独立完成基于 STM32 的控制系统设计，包括硬件电路与底层驱动开发，光路系统设计与搭建，并基于 Python 与 Matlab 开发 CMOS 图像采集程序及小波变换聚焦评价算法，实现测量流程自动化。
