const express = require('express');
const router = express.Router();
const { getTravels, getTravelById } = require('../controllers/travels');

// GET /api/travels - 获取旅行列表（支持筛选、分页、排序）
router.get('/', getTravels);

// GET /api/travels/:id - 获取旅行详情
router.get('/:id', getTravelById);

module.exports = router;
