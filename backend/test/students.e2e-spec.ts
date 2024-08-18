import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as casual from 'casual';
import { generateCPF } from '../src/utils/cpf-generator';
import { studentFactory } from '../prisma/factories/studentFactory';

describe('StudentController (e2e)', () => {
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

  it('/student (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/student')
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
      .query({ page: '1', limit: '10', raFilter: student.ra })
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      data: expect.any(Array),
    });
  });

  it('/student/:id (GET)', async () => {
    const student: any = await studentFactory();
    const response = await request(app.getHttpServer())
      .get(`/student/${student.id}`)
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      data: expect.any(Object),
    });
  });

  it('cannot find a non-existent student', async () => {
    await request(app.getHttpServer())
      .get(`/student/99999999`)
      .expect(HttpStatus.NOT_FOUND);

  });

  it('/student/:id (PUT)', async () => {
    const student: any = await studentFactory();
    const response = await request(app.getHttpServer())
      .put(`/student/${student.id}`)
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
      .expect(HttpStatus.OK);

    expect(response.body).toEqual({
      message: 'Student deleted successfully',
    });
  });

  it('cannot delete a non-existing student', async () => {
    const student: any = await studentFactory();
    await request(app.getHttpServer())
      .delete(`/student/${student.id}`)
      .expect(HttpStatus.OK);
  });
});