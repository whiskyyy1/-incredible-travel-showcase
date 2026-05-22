const { query, queryOne } = require('../database');

/**
 * 获取旅行体验列表
 * GET /api/travels
 * 支持按 experience_type、niche_level 筛选，支持分页和排序
 */
async function getTravels(req, res, next) {
    try {
        // 解析并校验分页参数
        const page = Math.max(1, parseInt(req.query.page, 10) || 1);
        const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 12));
        const offset = (page - 1) * limit;

        // 解析筛选参数
        const experienceType = req.query.experience_type;
        const nicheLevel = req.query.niche_level;
        const sort = req.query.sort || 'newest'; // 默认按最新排序

        // 构建 WHERE 条件数组和参数数组
        const conditions = [];
        const params = [];

        if (experienceType) {
            conditions.push('experience_type = ?');
            params.push(experienceType);
        }

        if (nicheLevel !== undefined && nicheLevel !== '') {
            const level = parseInt(nicheLevel, 10);
            if (!isNaN(level) && level >= 1 && level <= 5) {
                conditions.push('niche_level = ?');
                params.push(level);
            }
        }

        const whereClause = conditions.length > 0
            ? `WHERE ${conditions.join(' AND ')}`
            : '';

        // 构建 ORDER BY 子句
        let orderBy = 'ORDER BY created_at DESC';
        if (sort === 'niche_asc') {
            orderBy = 'ORDER BY niche_level ASC, created_at DESC';
        } else if (sort === 'niche_desc') {
            orderBy = 'ORDER BY niche_level DESC, created_at DESC';
        }

        // 查询总记录数（用于分页元信息）
        const countSql = `SELECT COUNT(*) as total FROM travels ${whereClause}`;
        const countResult = await queryOne(countSql, params);
        const total = countResult ? countResult.total : 0;
        const pages = Math.ceil(total / limit);

        // 查询当前页数据
        // 列表接口精简字段：不返回 story、tips 等长文本，减少传输体积
        const dataSql = `
            SELECT
                id, slug, title, description, location,
                experience_type, visual_style, niche_level,
                cover_image, created_at
            FROM travels
            ${whereClause}
            ${orderBy}
            LIMIT ? OFFSET ?
        `;
        const dataParams = [...params, limit, offset];
        const data = await query(dataSql, dataParams);

        // 返回标准响应格式
        res.json({
            data,
            meta: {
                total,
                page,
                limit,
                pages
            }
        });
    } catch (err) {
        next(err);
    }
}

/**
 * 获取单条旅行体验详情
 * GET /api/travels/:id
 * 返回完整字段，包含 story、tips 等详情内容
 */
async function getTravelById(req, res, next) {
    try {
        const id = parseInt(req.params.id, 10);

        // 校验 ID 有效性
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                error: '无效的旅行 ID',
                message: 'ID 必须是正整数'
            });
        }

        // 查询完整详情
        const sql = `
            SELECT
                id, slug, title, description, location,
                experience_type, visual_style, niche_level,
                story, tips, cover_image, created_at
            FROM travels
            WHERE id = ?
        `;

        const row = await queryOne(sql, [id]);

        // ID 不存在时返回 404
        if (!row) {
            return res.status(404).json({
                error: '旅行体验不存在',
                message: `找不到 ID 为 ${id} 的旅行体验`
            });
        }

        res.json({ data: row });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getTravels,
    getTravelById
};
