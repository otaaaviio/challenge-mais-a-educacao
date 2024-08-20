import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as casual from 'casual';
import { generateCPF } from '../src/utils/cpf-generator';
import { userFactory } from '../prisma/factories/user.factory';
import * as cookieParser from 'cookie-parser';
import { ErrorHandlerMiddleware } from '../src/middlewares/error-handler.middleware';
import { studentFactory } from '../prisma/factories/student.factory';

describe('Student Routes (e2e)', () => {
  let app: INestApplication;
  let cookie: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalFilters(new ErrorHandlerMiddleware());
    await app.init();

    // set cookie for auth in the tests
    const user = await userFactory();
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: 'password', // default password
      });
    cookie = response.header['set-cookie'];
  });

  afterAll(async () => {
    await app.close();
  });

  it('/student (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/student')
      .set('Cookie', cookie)
      .send({
        name: casual.name,
        email: casual.email,
        cpf: generateCPF(),
        ra: casual.integer(100000, 999999).toString(),
      })
      .expect(HttpStatus.CREATED);

    expect(response.body).toEqual({
      message: 'Student registered successfully',
      data: expect.any(Object),
    });
  });

  it('/student (GET)', async () => {
    const student: any = await studentFactory();
    const response = await request(app.getHttpServer())
      .get('/student')
      .set('cookie', cookie)
      .query({ page: '1', limit: '10', raFilter: student.ra })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      data: expect.any(Array),
      currentPage: 1,
      itemsPerPage: 10,
      totalData: expect.any(Number),
      totalPages: expect.any(Number),
    });
  });

  it('/student/:id (GET)', async () => {
    const student: any = await studentFactory();
    const response = await request(app.getHttpServer())
      .get(`/student/${student.id}`)
      .set('cookie', cookie)
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      data: expect.any(Object),
    });
  });

  it('/student/:id (GET) - cannot find a non-existent student', async () => {
    await request(app.getHttpServer())
      .get(`/student/99999999`)
      .set('cookie', cookie)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('/student/:id (PUT)', async () => {
    const student: any = await studentFactory();
    const response = await request(app.getHttpServer())
      .put(`/student/${student.id}`)
      .set('cookie', cookie)
      .send({
        name: casual.name,
        email: casual.email,
      })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      message: 'Student updated successfully',
      data: expect.any(Object),
    });
  });

  it('/student/:id (DELETE)', async () => {
    const student: any = await studentFactory();
    const response = await request(app.getHttpServer())
      .delete(`/student/${student.id}`)
      .set('cookie', cookie)
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      message: 'Student deleted successfully',
    });
  });

  it('/student/:id (DELETE) - cannot delete a non-existing student', async () => {
    await request(app.getHttpServer())
      .delete(`/student/99999`)
      .set('cookie', cookie)
      .expect(HttpStatus.NOT_FOUND);
  });

  it('/student (POST) - cannot register a student with invalid data', async () => {
    const response = await request(app.getHttpServer())
      .post('/student')
      .set('Cookie', cookie)
      .send({
        name: '',
        email: '',
        cpf: '',
        ra: '',
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body).toEqual({
      message: 'Validation error',
      errors: expect.any(Array),
    });
  });

  it('/student (POST) - cannot register a student with invalid CPF', async () => {
    const response = await request(app.getHttpServer())
      .post('/student')
      .set('Cookie', cookie)
      .send({
        name: casual.name,
        email: casual.email,
        cpf: '111.111.111-11',
        ra: casual.string,
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body).toEqual({
      message: 'Validation error',
      errors: [
        {
          code: 'custom',
          field: 'cpf',
          message: 'Invalid CPF',
        },
      ],
    });
  });

  it('/student (POST) - cannot register a student with duplicated RA', async () => {
    const student: any = await studentFactory();
    const response = await request(app.getHttpServer())
      .post('/student')
      .set('Cookie', cookie)
      .send({
        name: casual.name,
        email: casual.email,
        cpf: '523.944.305-08',
        ra: student.ra,
      })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body).toEqual({
      message: 'Unique constraint failed on the fields: ra',
      code: HttpStatus.BAD_REQUEST,
    });
  });
});
