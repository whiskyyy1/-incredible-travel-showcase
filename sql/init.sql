CREATE TABLE IF NOT EXISTS travels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    location TEXT,
    experience_type TEXT,
    visual_style TEXT,
    niche_level INTEGER,
    story TEXT,
    tips TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO travels (title, description, location, experience_type, visual_style, niche_level, story, tips, cover_image)
VALUES 
('荧光海滩奇遇', '在深夜看到整片海滩发蓝色荧光', '马尔代夫', '自然奇观', '梦幻夜景', 1, '海浪一拍打就像星空落在海里...', '一定要在新月夜晚去', 'https://example.com/1.jpg'),
('悬崖无人小镇', '欧洲边境被遗弃的彩色小镇', '意大利', '人文探险', '复古童话', 2, '空无一人却色彩鲜艳...', '穿舒适鞋子，路很陡', 'https://example.com/2.jpg'),
('海底餐厅用餐', '在水下餐厅看鱼游过身边', '迪拜', '美食体验', '未来科技', 3, '像在科幻电影里吃饭...', '提前一个月预约', 'https://example.com/3.jpg'),
('云上小木屋', '住在海拔3000米的云端木屋', '瑞士', '山居度假', '清新自然', 1, '早上醒来云就在脚下...', '带保暖衣物', 'https://example.com/4.jpg'),
('沙漠星空露营', '在撒哈拉沙漠看银河铺满天空', '摩洛哥', '星空露营', '极致浪漫', 2, '夜晚星星多到像梦境...', '注意防晒和补水', 'https://example.com/5.jpg');