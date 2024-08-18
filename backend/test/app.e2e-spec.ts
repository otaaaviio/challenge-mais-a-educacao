import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { HttpStatus, INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
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

  it('should fail this test', async () => {
    const response = await request(app.getHttpServer())
      .get('/non-existent-endpoint')
      .expect(HttpStatus.NOT_FOUND);

    expect(response.body).toEqual({
      error: 'Not Found',
      message: 'Cannot GET /non-existent-endpoint',
      statusCode: HttpStatus.NOT_FOUND,
    });
  });
});
