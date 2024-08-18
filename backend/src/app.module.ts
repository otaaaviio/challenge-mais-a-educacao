import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { StudentModule } from './modules/students/students.module';
import { AppController } from './app.controller';

@Module({
  imports: [PrismaModule, RedisModule, StudentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
