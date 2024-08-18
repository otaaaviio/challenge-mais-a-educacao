import { PrismaService } from '../src/modules/prisma/prisma.service';

async function addConstraint() {
  const prisma = new PrismaService();

  try {
    console.log('Adding constraints...')
    await prisma.$executeRaw`CREATE UNIQUE INDEX unique_cpf_when_not_deleted ON "students" (cpf) WHERE "deletedAt" IS NULL`;
    await prisma.$executeRaw`CREATE UNIQUE INDEX unique_ra_when_not_deleted ON "students" (ra) WHERE "deletedAt" IS NULL`;
  } catch (err) {
    console.error('Error to adding constraints: ', err.message);
  }
}

addConstraint().then(() => console.log('done!'));