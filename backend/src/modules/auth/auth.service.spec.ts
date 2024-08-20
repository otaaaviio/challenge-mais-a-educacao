import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let user;

  beforeEach(async () => {
    user = {
      id: 1,
      name: 'John Doe',
      email: 'john@test.com',
      password: await bcrypt.hash('password', 10),
    };

    const mockPrismaService = {
      user: {
        findFirst: jest.fn().mockResolvedValue(user),
        create: jest.fn().mockResolvedValue(user),
      },
      session: {
        updateMany: jest.fn().mockResolvedValue({ count: 1 }),
        create: jest.fn().mockResolvedValue({ id: 1 }),
      },
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('token'),
      verify: jest.fn().mockReturnValue({ userId: 1 }),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = moduleRef.get(AuthService) as AuthService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login a user', async () => {
    const result = await service.validate({
      password: 'password',
      email: user.email,
    }, '', '');
    expect(result).toEqual({
      token: 'token',
      user: {
        email: user.email,
        id: user.id,
        name: user.name,
      },
    });
  });

  it('should throw an exception when authenticating a user with invalid credentials', async () => {
    await expect(service.validate({ email: user.email, password: '' }, '', ''))
      .rejects
      .toThrowError('Invalid credentials');
  });

  it('should register a user', async () => {
    const result = await service.register(user, '', '');
    expect(result).toEqual({
      token: 'token',
      user: { id: user.id, name: user.name, email: user.email },
    });
  });

  it('should logout a user', async () => {
    const result = await service.logout('token');
    expect(result).toBeUndefined();
  });

  it('should throw an exception when logout without token', async () => {
    await expect(service.logout()).rejects.toThrowError('Invalid Token');
  });
});
