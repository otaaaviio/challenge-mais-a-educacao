import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { StudentNotFoundException } from '../../exceptions/student-not-found.exception';

@Injectable()
export class StudentService {
  private readonly studentSelect = {
    id: true,
    name: true,
    email: true,
    ra: true,
    cpf: true,
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async createStudent(payload) {
    const student = await this.prisma.student.create({
      data: payload,
      select: { id: true },
    });

    await this.invalidateAllStudentCaches();

    return student;
  }

  async findAllStudents(params: {
    page: number;
    limit: number;
    raFilter: string;
  }) {
    const whereClause: any = { deletedAt: null };
    if (params.raFilter)
      whereClause.ra = { contains: params.raFilter, mode: 'insensitive' };

    const redisKey = `students:page:${params.page}:limit:${params.limit}:raFilter:${params.raFilter ?? 'null'}`;
    const cachedStudents = await this.redis.get(redisKey);

    if (cachedStudents) return JSON.parse(cachedStudents);

    const students = await this.prisma.student.findMany({
      where: whereClause,
      select: this.studentSelect,
      take: params.limit,
      skip: (params.page - 1) * params.limit,
    });

    const totalStudents = await this.prisma.student.count({
      where: whereClause,
    });

    const paginatedData = {
      data: students,
      currentPage: params.page,
      itemsPerPage: params.limit,
      totalData: totalStudents,
      totalPages: Math.ceil(totalStudents / params.limit),
    };

    await this.redis.set(redisKey, JSON.stringify(paginatedData));

    return paginatedData;
  }

  async findStudent(id: number) {
    const student = await this.prisma.student.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      select: this.studentSelect,
    });

    if (!student) throw new StudentNotFoundException();

    return student;
  }

  async updateStudent(id: number, payload) {
    await this.findStudent(id);

    const updatedStudent = await this.prisma.student.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: payload,
      select: this.studentSelect,
    });

    await this.invalidateAllStudentCaches();

    return updatedStudent;
  }

  async removeStudent(id: number): Promise<void> {
    await this.findStudent(id);

    await this.prisma.student.update({
      where: {
        id: id,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    await this.invalidateAllStudentCaches();
  }

  private async invalidateAllStudentCaches() {
    const keys = await this.redis.keys('students:page:*');
    for (const key of keys) {
      await this.redis.del(key);
    }
  }
}
