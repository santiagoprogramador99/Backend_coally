const request = require('supertest');
const app = require('../app'); // Asegúrate de tener tu app configurada correctamente
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Task = require('../models/task');

// Configurar MongoDB en memoria
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /tasks', () => {
  it('should create a new task successfully', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'New Task',
        description: 'This is a new task',
        completed: false
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'New Task');
    expect(res.body).toHaveProperty('description', 'This is a new task');
    expect(res.body).toHaveProperty('completed', false);
  });

  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Incomplete Task'
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'All fields are required');
  });

  it('should return 400 if validation errors occur', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: '',
        description: '',
        completed: undefined
      });

    expect(res.status).toBe(400);
    expect(res.body.errors).toBeInstanceOf(Array);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });
});
