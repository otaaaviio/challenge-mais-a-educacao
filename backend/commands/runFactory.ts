import {PrismaService} from '../src/modules/prisma/prisma.service';
import { studentFactory } from '../prisma/factories/student.factory';
import { userFactory } from '../prisma/factories/user.factory';

const prisma = new PrismaService();

const factories = [
    {name: 'student', run: studentFactory},
    {name: 'user', run: userFactory},
];

const factoryName = process.argv[2];
const count = Number(process.argv[3]);
const factory = factories.find(f => f.name === factoryName);

async function run() {
    if (!factory) {
        console.error(`Unknown factory: ${factoryName}`);
        process.exit(1);
    } else if (isNaN(count) || count < 1) {
        console.error(`Invalid count: ${count}`);
        process.exit(1);
    } else {
        for (let i = 0; i < Number(count); i++) {
            const result = await factory.run();
            console.log(`${factoryName} created:`, result);
        }
    }
}

run().catch(
    async (err: Error) => {
        console.error('Error running factory: ', err.message);
        await prisma.$disconnect();
    }).finally(async () => {
    await prisma.$disconnect();
});