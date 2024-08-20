import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as casual from 'casual';
import { userFactory } from '../prisma/factories/user.factory';
import * as cookieParser from 'cookie-parser';
import { ErrorHandlerMiddleware } from '../src/middlewares/error-handler.middleware';

describe('Auth Routes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalFilters(new ErrorHandlerMiddleware());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: casual.name,
        email: casual.email,
        password: casual.password,
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({
      message: 'Successfully registered',
      user: expect.any(Object),
    });

    expect(response.header['set-cookie']).toBeDefined();
  });

  it('/auth/register (POST) - should return 400 if email is already in use', async () => {
    const user = await userFactory();

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: casual.name,
        email: user.email,
        password: casual.password,
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body).toEqual({
      message: 'Unique constraint failed on the fields: email',
      code: HttpStatus.BAD_REQUEST,
    });
  });

  it('/auth/login (POST)', async () => {
    const user = await userFactory();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        name: user.name,
        email: user.email,
        password: 'password',
      })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      message: 'Successfully logged in',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });

  it('/auth/login (POST) - should return 404 if user is not found', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: casual.email,
        password: casual.password,
      })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('/auth/login (POST) - should return 401 if password is incorrect', async () => {
    const user = await userFactory();

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: casual.password,
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('/auth/logout (GET)', async () => {
    const user = await userFactory();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: 'password',
      })
      .expect(HttpStatus.OK);

    const cookie = response.header['set-cookie'];

    await request(app.getHttpServer())
      .get('/auth/logout')
      .set('Cookie', cookie)
      .expect(HttpStatus.OK);
  });

  it('/auth/logout (GET) - should return 401 if no token is provided', async () => {
    await request(app.getHttpServer())
      .get('/auth/logout')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
