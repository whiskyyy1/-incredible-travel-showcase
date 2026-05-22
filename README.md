项目简介
本项目是一款面向 Z 世代年轻群体的小众特色旅行灵感展示平台。主打「发现从未想过的旅行方式」，主打差异化、小众化、高颜值旅行内容，服务于拒绝大众网红打卡、追求个性化、沉浸式旅行体验的用户。
项目采用前后端分离架构，基于 Node.js + Express 搭建轻量化后端 API，搭配原生前端页面实现完整 MVP 展示能力，支持旅行列表筛选、分页、排序、详情查看等核心功能。
技术选型
后端技术
- Node.js + Express：轻量高效服务端框架，快速搭建 RESTful API
- SQLite3：轻量化文件数据库，无需部署，开箱即用
- CORS：解决前后端跨域请求问题
前端技术
- 原生 HTML + CSS + JavaScript：无框架依赖，轻量化、易部署
- AJAX：异步请求后端 API，动态渲染页面数据
- 响应式布局：适配电脑、平板等多端浏览
测试技术
- Jest + Supertest：完成单元测试 + 端到端接口测试
开发范式
严格遵循 AI 工程化开发流程：SDD数据建模 → DDD设计开发 → TDD单元测试 → E2E全链路验收
完整运行指南
1. 环境要求
本地需安装：Node.js 14.0+（自带 npm 工具）
2. 项目初始化步骤
打开 PowerShell / 终端，进入项目根目录：
cd D:\MyProject520\incredible-travel-showcase
3. 安装项目依赖
npm install
4. 启动后端服务
node src/server.js
启动成功提示：
- 服务器运行在 http://localhost:3000
- 数据库连接成功
5. 项目访问地址
- 前端首页（旅行列表）：http://localhost:3000
- 前端详情页：http://localhost:3000/detail.html?id=1
- 旅行列表 API：http://localhost:3000/api/travels
- 旅行详情 API：http://localhost:3000/api/travels/1
6. 运行全套测试
npm test
自动执行单元测试、E2E 接口测试，验证项目完整性。
7. 关闭服务
终端按下Ctrl + C 即可停止服务。
后台账号说明
本项目为纯前端内容展示型 MVP，无后台管理系统、无用户登录模块、无权限校验机制。