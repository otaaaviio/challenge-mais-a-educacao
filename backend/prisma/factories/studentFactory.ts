import {Factory} from "rosie";
import * as casual from "casual";
import { PrismaService } from '../../src/modules/prisma/prisma.service';

const prisma = new PrismaService();

function generateFakeCpf(): string {
  return `${casual.integer(100, 999)}.${casual.integer(100, 999)}.${casual.integer(100, 999)}-${casual.integer(10, 99)}`;
}

export async function studentFactory() {
  const data = Factory.define('student')
    .attr('name', () => casual.full_name)
    .attr('email', () => casual.email)
    .attr('ra', () => casual.integer(100000, 999999).toString())
    .attr('cpf', () => generateFakeCpf())
    .build();

  return prisma.student.create({
    data: data,
  });
}