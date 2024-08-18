import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Res,
  Logger, Query, Put,
} from '@nestjs/common';
import { StudentService } from './students.service';
import { createStudentSchema, updateStudentSchema } from '../schemas/student.schema';
import { validateQueryParams } from '../../utils/query-params-validator';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly logger: Logger,
  ) {
  }

  @Post()
  async create(@Body() body, @Res() res) {
    try {
      const validatedBody = createStudentSchema.parse(body);
      const student = await this.studentService.createStudent(validatedBody);
      return res
        .status(HttpStatus.CREATED)
        .send({ message: 'Student registered successfully', data: student });
    } catch (err) {
      this.logger.error(`Failed to register student:\n ${err}`);
      throw err;
    }
  }

  @Get()
  async findAll(
    @Query('page') page,
    @Query('limit') limit,
    @Query('raFilter') raFilter,
    @Res() res,
  ) {
    const params = validateQueryParams({ page, limit, raFilter });
    try {
      const students = await this.studentService.findAllStudents(params);
      return res.status(HttpStatus.OK).send({ data: students });
    } catch (err) {
      this.logger.error(`Failed to find all students:\n ${err}`);
      throw err;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const student = await this.studentService.findStudent(+id);
      return res.status(HttpStatus.OK).send({ data: student });
    } catch (err) {
      this.logger.error(`Failed to find student:\n ${err}`);
      throw err;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body,
    @Res() res,
  ) {
    try {
      const validatedBody = updateStudentSchema.parse(body);
      const student = await this.studentService.updateStudent(
        +id,
        validatedBody,
      );
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Student updated successfully', data: student });
    } catch (err) {
      this.logger.error(`Failed to update student:\n ${err}`);
      throw err;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      await this.studentService.removeStudent(+id);
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Student deleted successfully' });
    } catch (err) {
      this.logger.error(`Failed to delete student:\n ${err}`);
      throw err;
    }
  }
}
