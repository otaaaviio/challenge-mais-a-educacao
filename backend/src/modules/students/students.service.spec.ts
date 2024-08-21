import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './students.service';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

describe('StudentService', () => {
  let service: StudentService;
  const student = {
    id: 1,
    name: 'John Doe',
    email: 'john@test.com',
    ra: '123456',
    cpf: '123.456.789-00',
  };

  beforeEach(async () => {
    const mockPrismaService = {
      student: {
        create: jest.fn().mockResolvedValue({ id: 1 }),
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        findUnique: jest.fn().mockResolvedValue(student),
        update: jest.fn().mockResolvedValue(student),
      },
    };

    const mockRedisService = {
      get: jest.fn(),
      set: jest.fn(),
      keys: jest.fn().mockResolvedValue([]),
      del: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
    }).compile();

    service = moduleRef.get(StudentService) as StudentService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a student', async () => {
    const response = await service.createStudent(student);
    expect(response).toEqual({ id: student.id });
  });

  it('should find all students', async () => {
    const response = await service.findAllStudents({
      page: 1,
      limit: 10,
      raFilter: '',
      sortBy: [{ key: 'name', order: 'asc' }],
    });
    expect(response).toEqual({ currentPage: 1, data: [], itemsPerPage: 10, totalData: 0, totalPages: 0 });
  });

  it('should find a student by id', async () => {
    const response = await service.findStudent(1);
    expect(response).toEqual(student);
  });

  it('should update a student', async () => {
    const response = await service.updateStudent(1, student);
    expect(response).toEqual(student);
  });
});
