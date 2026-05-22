const request = require('supertest');
const app = require('../../src/server');

test('GET /api/travels', async () => {
  const res = await request(app).get('/api/travels');
  expect(res.statusCode).toBe(200);
});

test('GET /api/travels/1', async () => {
  const res = await request(app).get('/api/travels/1');
  expect(res.statusCode).toBe(200);
});

test('GET /api/travels/999', async () => {
  const res = await request(app).get('/api/travels/999');
  expect(res.statusCode).toBe(404);
});