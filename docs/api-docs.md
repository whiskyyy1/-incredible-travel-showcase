# API 契约设计

## 概述

本文档定义「100种不可思议旅行」MVP 阶段的核心 REST API 接口。

- **基础路径**: `/api`
- **数据格式**: JSON
- **字符编码**: UTF-8

---

## 接口列表

| 方法 | 路径 | 描述 |
|---|---|---|
| GET | /api/travels | 获取旅行体验列表 |
| GET | /api/travels/:id | 获取单条旅行体验详情 |

---

## 1. 获取旅行列表

### 请求

```http
GET /api/travels?experience_type={type}&niche_level={level}&page={page}&limit={limit}
```

### 查询参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| experience_type | string | 否 | 按体验类型筛选 | `自然奇观` |
| niche_level | integer | 否 | 按小众程度筛选（1-5） | `3` |
| page | integer | 否 | 页码，默认 1 | `1` |
| limit | integer | 否 | 每页条数，默认 12，最大 50 | `12` |
| sort | string | 否 | 排序方式：`newest`（默认）\|`niche_asc`\|`niche_desc` | `newest` |

### 响应示例

**成功响应 (200 OK)**

```json
{
  "data": [
    {
      "id": 1,
      "slug": "fluorescent-beach",
      "title": "荧光海滩奇遇",
      "description": "在深夜看到整片海滩发蓝色荧光",
      "location": "马尔代夫",
      "experience_type": "自然奇观",
      "visual_style": "梦幻夜景",
      "niche_level": 1,
      "cover_image": "https://images.unsplash.com/photo-xxx?w=800",
      "created_at": "2024-01-15T08:30:00Z"
    },
    {
      "id": 8,
      "slug": "pink-lake",
      "title": "粉红湖泊漂浮",
      "description": "在天然粉红湖中轻松漂浮",
      "location": "塞内加尔·雷特巴湖",
      "experience_type": "自然奇观",
      "visual_style": "超现实色彩",
      "niche_level": 2,
      "cover_image": "https://images.unsplash.com/photo-xxx?w=800",
      "created_at": "2024-03-22T14:15:00Z"
    }
  ],
  "meta": {
    "total": 8,
    "page": 1,
    "limit": 12,
    "total_pages": 1,
    "has_next": false,
    "has_prev": false
  }
}
```

### 状态码说明

| 状态码 | 说明 |
|---|---|
| 200 | 请求成功 |
| 400 | 请求参数错误（如 niche_level 超出 1-5 范围） |
| 500 | 服务器内部错误 |

---

## 2. 获取旅行详情

### 请求

```http
GET /api/travels/:id
```

### 路径参数

| 参数 | 类型 | 必填 | 说明 | 示例 |
|---|---|---|---|---|
| id | integer | 是 | 旅行体验 ID | `1` |

### 响应示例

**成功响应 (200 OK)**

```json
{
  "data": {
    "id": 1,
    "slug": "fluorescent-beach",
    "title": "荧光海滩奇遇",
    "description": "在深夜看到整片海滩发蓝色荧光",
    "location": "马尔代夫",
    "experience_type": "自然奇观",
    "visual_style": "梦幻夜景",
    "niche_level": 1,
    "story": "海浪一拍打就像星空落在海里，每一步都留下蓝色的脚印。这是生物发光现象，由浮游植物对机械刺激的反应产生。",
    "tips": "一定要在新月夜晚去，光污染最少；赤足行走效果最佳。",
    "cover_image": "https://images.unsplash.com/photo-xxx?w=800",
    "created_at": "2024-01-15T08:30:00Z"
  }
}
```

### 状态码说明

| 状态码 | 说明 |
|---|---|
| 200 | 请求成功 |
| 404 | 指定 ID 的旅行体验不存在 |
| 500 | 服务器内部错误 |

---

## 设计原则

1. **列表精简，详情完整**: `/api/travels` 返回不含 `story` 和 `tips` 的精简字段，适配卡片布局；详情接口返回完整内容
2. **语义化筛选**: `experience_type` 和 `niche_level` 直接映射业务概念，前端无需转换
3. **分页友好**: 响应包含 `meta` 元信息，便于前端实现分页/无限滚动
4. **无状态设计**: 接口不依赖 Session，为后续开放 API/小程序预留空间
