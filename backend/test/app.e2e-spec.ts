import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('App Routes (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/hello')
      .expect(HttpStatus.OK)
      .expect('Hello World!');
  });

  it('/non-existent-endpoint (GET) should return unauthorized when tries to access a non-existent route', async () => {
    await request(app.getHttpServer())
      .get('/non-existent-endpoint')
      .set('Cookie', 'token=invalid-token')
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
