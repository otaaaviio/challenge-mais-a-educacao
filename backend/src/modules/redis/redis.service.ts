import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';

@Injectable()
export class RedisService extends Redis implements OnModuleInit {
  constructor() {
    super({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
    } as RedisOptions);

    this.on('error', (err: Error) => {
      console.error('Redis Client Error:', err);
    });
  }

  async onModuleInit() {}
}
