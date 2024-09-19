import bcrypt from 'bcryptjs';
import { Secret, verify } from 'jsonwebtoken';
import request from 'supertest';
import { Server } from 'http';

import { users } from '../data/users';
import app from '../server';

describe('Login', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(process.env.TEST_PORT || 4000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should login a user and return a JWT token', async () => {
    const validUser = users.at(0);

    const password = await bcrypt.hash(validUser?.password || '', 10);
    
    const response = await request(server).post('/login').send({
      username: validUser?.username,
      password,
    });

    expect(response.statusCode).toEqual(200);
    expect(verify(response.body, process.env.JWT_SECRET as Secret)).toHaveProperty('userId');
  });

  it('should not login with wrong credentials', async () => {
    const password = await bcrypt.hash('password', 10);
    
    const response = await request(server).post('/login').send({
      username: 'username',
      password,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('messages', 'Invalid credentials');
  });

  it('should not login if password not match', async () => {
    const validUser = users.at(0);
    const password = await bcrypt.hash('password', 10);
    
    const response = await request(server).post('/login').send({
      username: validUser?.username,
      password,
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('messages', 'Invalid credentials');
  });

  it('should authorize an admin user', async () => {
    const adminUser = users.at(0);

    const password = await bcrypt.hash(adminUser?.password || '', 10);
    
    const responseLogin = await request(server).post('/login').send({
      username: adminUser?.username,
      password,
    });

    const token = responseLogin.body;

    const responseAuth = await request(server).get('/admin').set('Authorization', `Bearer ${token}`);

    expect(responseAuth.statusCode).toEqual(200);
    expect(responseAuth.body).toEqual('Welcome admin!');
  });
});