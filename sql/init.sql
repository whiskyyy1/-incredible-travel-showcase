-- ==========================================
-- 100种不可思议旅行 - SQLite 数据库初始化脚本
-- 阶段: SDD - 数据建模
-- ==========================================

-- 删除旧表（开发环境使用）
DROP TABLE IF EXISTS travels;

-- 旅行信息表
-- 存储每一种独特旅行体验的核心内容
CREATE TABLE travels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- URL 友好标识，用于 SEO 和 API 路由
    slug TEXT UNIQUE NOT NULL,
    -- 体验标题
    title TEXT NOT NULL,
    -- 一句话钩子/描述，用于列表卡片展示
    description TEXT,
    -- 地点（国家/城市）
    location TEXT NOT NULL,
    -- 体验类型：自然奇观、人文探险、美食体验、极限运动、艺术巡礼、星空露营等
    experience_type TEXT NOT NULL,
    -- 视觉风格标签：梦幻夜景、复古童话、未来科技、清新自然、极致浪漫等
    visual_style TEXT,
    -- 小众程度：1-5 级，1=相对知名，5=极为小众
    niche_level INTEGER NOT NULL CHECK (niche_level BETWEEN 1 AND 5),
    -- 详细故事/体验描述，详情页展示
    story TEXT,
    -- 实用旅行贴士
    tips TEXT,
    -- 封面图 URL
    cover_image TEXT,
    -- 记录创建时间
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- 约束说明
    -- CHECK (niche_level BETWEEN 1 AND 5) 确保小众程度在合理范围内
    -- UNIQUE (slug) 确保 URL 标识唯一性
);

-- 性能优化索引
-- 按体验类型筛选（最常用）
CREATE INDEX idx_travels_experience_type ON travels(experience_type);
-- 按小众程度筛选
CREATE INDEX idx_travels_niche_level ON travels(niche_level);
-- 复合索引：类型 + 小众程度（组合筛选场景）
CREATE INDEX idx_travels_type_niche ON travels(experience_type, niche_level);
-- 按创建时间排序（最新/最热）
CREATE INDEX idx_travels_created_at ON travels(created_at DESC);

-- ==========================================
-- 测试数据（8条种子数据，覆盖多种类型与风格）
-- ==========================================

INSERT INTO travels (slug, title, description, location, experience_type, visual_style, niche_level, story, tips, cover_image)
VALUES
('fluorescent-beach', '荧光海滩奇遇', '在深夜看到整片海滩发蓝色荧光', '马尔代夫', '自然奇观', '梦幻夜景', 1, '海浪一拍打就像星空落在海里，每一步都留下蓝色的脚印。这是生物发光现象，由浮游植物对机械刺激的反应产生。', '一定要在新月夜晚去，光污染最少；赤足行走效果最佳。', 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800'),
('cliff-abandoned-town', '悬崖无人小镇', '欧洲边境被遗弃的彩色小镇', '意大利·五渔村附近', '人文探险', '复古童话', 2, '空无一人却色彩鲜艳，仿佛时间在这里按下了暂停键。墙壁上的涂鸦与褪色的门窗讲述着上世纪的故事。', '穿舒适鞋子，路很陡；建议清晨前往，光线最适合拍照。', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800'),
('underwater-restaurant', '海底餐厅用餐', '在水下餐厅看鱼群游过身边', '迪拜', '美食体验', '未来科技', 3, '像在科幻电影里吃饭，巨大的弧形玻璃窗外是真实的海洋世界。鲨鱼、魔鬼鱼与你共进晚餐。', '提前一个月预约；晚餐时段氛围最佳但价格较高，午餐性价比更好。', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'),
('cloud-cabin', '云上小木屋', '住在海拔3000米的云端木屋', '瑞士·阿尔卑斯', '山居度假', '清新自然', 1, '早上醒来云就在脚下，阳光穿透薄雾洒在雪山顶上。没有网络信号，却有整片星空陪你入睡。', '带保暖衣物，即使是夏天夜晚也很冷；建议自备干粮。', 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=800'),
('desert-stargazing', '沙漠星空露营', '在撒哈拉沙漠看银河铺满天空', '摩洛哥·梅尔祖卡', '星空露营', '极致浪漫', 2, '夜晚星星多到像梦境，银河清晰可见。沙漠的寂静让人听见自己的心跳，篝火旁当地人会讲古老的柏柏尔故事。', '注意防晒和补水；带厚睡袋，沙漠昼夜温差极大。', 'https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800'),
('volcano-boarding', '火山滑板速降', '在活火山灰上滑板冲下', '尼加拉瓜·塞罗内格罗', '极限运动', '荒野暗黑', 4, '以每小时80公里的速度从活火山灰坡上滑下，烟尘飞扬，肾上腺素爆表。这是世界上最酷也最危险滑板体验。', '必须戴护目镜和穿连体服；相机手机做好防尘保护；体能要求较高。', 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'),
('ice-hotel', '冰雕酒店过夜', '在零下5度的冰雕房间里睡觉', '瑞典·尤卡斯耶尔维', '艺术巡礼', '极简冷冽', 3, '从墙壁到床榻全部由冰与雪雕刻而成，每年主题不同。睡袋是特制的，醒来时睫毛上结着霜花。', '穿羊毛内衣；酒店提供特制睡袋；只在每年12月至次年4月开放。', 'https://images.unsplash.com/photo-1518182170546-0766bc6f9213?w=800'),
('pink-lake', '粉红湖泊漂浮', '在天然粉红湖中轻松漂浮', '塞内加尔·雷特巴湖', '自然奇观', '超现实色彩', 2, '湖水呈现梦幻的草莓奶昔色，盐度极高让人像死海一样自然漂浮。当地采盐人在湖中劳作的画面极具人文美感。', '保护眼睛，盐水入眼非常刺痛；携带淡水冲洗；最佳季节是旱季（11月-6月）。', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800');
