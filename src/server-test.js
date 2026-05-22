const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// 日志中间件 - 查看所有请求
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// 设置静态文件目录 - 关键配置
const publicPath = path.resolve(__dirname, '../public');
console.log(`📁 静态文件目录: ${publicPath}`);

// 提供静态文件服务
app.use(express.static(publicPath));

// 处理根路径 - 发送index.html
app.get('/', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    console.log(`📄 发送文件: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error(`❌ 发送失败: ${err}`);
            res.status(500).send(`无法加载index.html: ${err.message}`);
        } else {
            console.log(`✅ index.html发送成功`);
        }
    });
});

// API路由（如果存在）
try {
    const travelsRouter = require('./routes/travels');
    app.use('/api/travels', travelsRouter);
    console.log('✅ API路由已加载');
} catch (err) {
    console.log(`⚠️ API路由未找到: ${err.message}`);
    // 提供测试API
    app.get('/api/travels', (req, res) => {
        res.json({ message: 'API路由未配置，请检查routes/travels.js', status: 'warning' });
    });
}

// 404处理
app.use((req, res) => {
    console.log(`❌ 404: ${req.url}`);
    res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head><title>404 - 页面未找到</title></head>
        <body>
            <h1>404 - 页面未找到</h1>
            <p>请求的路径: ${req.url}</p>
            <p>可用的路径:</p>
            <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/index.html">index.html</a></li>
                <li><a href="/detail.html">detail.html</a></li>
                <li><a href="/api/travels">API测试</a></li>
            </ul>
            <hr>
            <p>静态文件目录: ${publicPath}</p>
        </body>
        </html>
    `);
});

// 启动服务器
app.listen(port, () => {
    console.log(`\n========================================`);
    console.log(`✅ 服务器启动成功！`);
    console.log(`🌐 访问地址: http://localhost:${port}`);
    console.log(`📁 静态文件目录: ${publicPath}`);
    console.log(`========================================\n`);
});