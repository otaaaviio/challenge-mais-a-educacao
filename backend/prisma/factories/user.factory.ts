import {Factory} from "rosie";
import * as casual from "casual";
import { PrismaService } from '../../src/modules/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaService();

export async function userFactory() {
  const defaultPass = await bcrypt.hash('password', 10);

  const data = Factory.define('student')
    .attr('name', () => casual.full_name)
    .attr('email', () => casual.email)
    .attr('password', () => defaultPass)
    .build();

  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}