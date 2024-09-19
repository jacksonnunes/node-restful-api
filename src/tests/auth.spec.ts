import bcrypt from 'bcryptjs';
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

  it('should authorize an admin user', async () => {
    const adminUser = users.at(0);

    const password = await bcrypt.hash(adminUser?.password || '', 10);
    
    const responseLogin = await request(server).post('/login').send({
      username: adminUser?.username,
      password,
    });

    const token = responseLogin.body;

    const responseAuth = await request(server).get('/admin').set('Authorization', `Bearer ${token}`);

    expect(responseAuth.statusCode).toBe(200);
    expect(responseAuth.body).toEqual('Welcome admin!');
  });

  it('shouldn\'t authorize an user to access an admin route', async () => {
    const adminUser = users.at(1);

    const password = await bcrypt.hash(adminUser?.password || '', 10);
    
    const responseLogin = await request(server).post('/login').send({
      username: adminUser?.username,
      password,
    });

    const token = responseLogin.body;

    const responseAuth = await request(server).get('/admin').set('Authorization', `Bearer ${token}`);

    expect(responseAuth.statusCode).toBe(401);
    expect(responseAuth.body).toHaveProperty('messages', 'Access denied: Insufficient permissions');
  });

  it('shouldn\'t authorize access with no token provided', async () => {
    const responseAuth = await request(server).get('/admin');

    expect(responseAuth.statusCode).toBe(403);
    expect(responseAuth.body).toHaveProperty('messages', 'Forbbiden: Token not provided');
  });
});