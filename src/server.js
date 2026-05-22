const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 静态文件
app.use(express.static(path.join(__dirname, '../public')));

// 根路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API
const travelsRouter = require('./routes/travels');
app.use('/api/travels', travelsRouter);

// 🔥 只导出 app，不启动服务（给测试用）
module.exports = app;

// 🔥 直接运行时才启动
if (require.main === module) {
  app.listen(port, () => {
    console.log('✅ 项目运行在 http://localhost:' + port);
  });
}