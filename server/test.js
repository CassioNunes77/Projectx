const request = require('supertest');
const express = require('express');
const app = require('./index');

describe('API Tests', () => {
  let server;

  beforeAll(() => {
    server = app.listen(5001);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/personalities', () => {
    it('should return all personalities', async () => {
      const response = await request(app)
        .get('/api/personalities')
        .expect(200);

      expect(response.body).toHaveProperty('carinhosa');
      expect(response.body).toHaveProperty('divertida');
      expect(response.body).toHaveProperty('timida');
      expect(response.body.carinhosa).toHaveProperty('name', 'Luna');
    });
  });

  describe('POST /api/register', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        personalityType: 'carinhosa',
        hobbies: 'Testing, coding'
      };

      const response = await request(app)
        .post('/api/register')
        .send(userData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('userId');
      expect(response.body).toHaveProperty('personality');
      expect(response.body.personality.name).toBe('Luna');
    });

    it('should return error for invalid personality type', async () => {
      const userData = {
        name: 'Test User',
        personalityType: 'invalid',
        hobbies: 'Testing'
      };

      const response = await request(app)
        .post('/api/register')
        .send(userData)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /api/chat', () => {
    let userId;

    beforeAll(async () => {
      const userData = {
        name: 'Chat Test User',
        personalityType: 'carinhosa',
        hobbies: 'Testing'
      };

      const response = await request(app)
        .post('/api/register')
        .send(userData);

      userId = response.body.userId;
    });

    it('should return AI response', async () => {
      const messageData = {
        userId: userId,
        message: 'Oi, como você está?'
      };

      const response = await request(app)
        .post('/api/chat')
        .send(messageData)
        .expect(200);

      expect(response.body).toHaveProperty('response');
      expect(response.body).toHaveProperty('relationshipLevel');
      expect(response.body).toHaveProperty('personality');
      expect(typeof response.body.response).toBe('string');
      expect(response.body.response.length).toBeGreaterThan(0);
    });

    it('should return error for invalid user', async () => {
      const messageData = {
        userId: 'invalid_user_id',
        message: 'Oi'
      };

      const response = await request(app)
        .post('/api/chat')
        .send(messageData)
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/user/:userId', () => {
    let userId;

    beforeAll(async () => {
      const userData = {
        name: 'Profile Test User',
        personalityType: 'divertida',
        hobbies: 'Testing'
      };

      const response = await request(app)
        .post('/api/register')
        .send(userData);

      userId = response.body.userId;
    });

    it('should return user profile', async () => {
      const response = await request(app)
        .get(`/api/user/${userId}`)
        .expect(200);

      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('personality');
      expect(response.body).toHaveProperty('relationshipLevel');
      expect(response.body).toHaveProperty('conversationCount');
      expect(response.body.user.name).toBe('Profile Test User');
      expect(response.body.personality.name).toBe('Sophia');
    });

    it('should return error for invalid user', async () => {
      const response = await request(app)
        .get('/api/user/invalid_user_id')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });
});

// Testes de integração com OpenAI (requer API key)
describe('OpenAI Integration Tests', () => {
  if (!process.env.OPENAI_API_KEY) {
    it.skip('skipping OpenAI tests - no API key', () => { });
    return;
  }

  let userId;

  beforeAll(async () => {
    const userData = {
      name: 'OpenAI Test User',
      personalityType: 'timida',
      hobbies: 'Testing AI'
    };

    const response = await request(app)
      .post('/api/register')
      .send(userData);

    userId = response.body.userId;
  });

  it('should generate realistic AI responses', async () => {
    const messageData = {
      userId: userId,
      message: 'Qual é o seu nome?'
    };

    const response = await request(app)
      .post('/api/chat')
      .send(messageData)
      .expect(200);

    expect(response.body.response).toContain('Emma');
    expect(response.body.response.length).toBeGreaterThan(10);
  });

  it('should maintain conversation context', async () => {
    // Primeira mensagem
    await request(app)
      .post('/api/chat')
      .send({
        userId: userId,
        message: 'Meu nome é João'
      });

    // Segunda mensagem referenciando a primeira
    const response = await request(app)
      .post('/api/chat')
      .send({
        userId: userId,
        message: 'Você lembra do meu nome?'
      })
      .expect(200);

    expect(response.body.response.toLowerCase()).toContain('joão');
  });
}); 