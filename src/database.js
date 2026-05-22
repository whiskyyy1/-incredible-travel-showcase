const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// 数据库文件路径：项目根目录下的 database/travel.db
const DB_PATH = path.join(__dirname, '..', 'database', 'travel.db');

// 创建 SQLite 数据库连接实例
const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('数据库连接失败:', err.message);
    } else {
        console.log('✅ 成功连接到 SQLite 数据库');
    }
});

/**
 * 执行 SQL 查询，返回多行结果
 * @param {string} sql - SQL 语句
 * @param {Array} params - 查询参数（防止 SQL 注入）
 * @returns {Promise<Array>} 查询结果数组
 */
function query(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 * 执行 SQL 查询，返回单行结果
 * @param {string} sql - SQL 语句
 * @param {Array} params - 查询参数
 * @returns {Promise<Object|null>} 单行结果或 null
 */
function queryOne(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row || null);
            }
        });
    });
}

module.exports = {
    db,
    query,
    queryOne
};
