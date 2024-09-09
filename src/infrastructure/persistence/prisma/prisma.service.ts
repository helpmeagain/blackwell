import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: ['warn', 'error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientInitializationError) {
        throw new ServiceUnavailableException(
          `Database connection failed. Restart the application with the database server running.`,
          `Prisma Client Initialization Error(${error.errorCode}): ${error.message.replace(/\n/g, ' ')} `,
        );
      } else {
        throw new ServiceUnavailableException(
          `Database connection failed. Unknown error`,
          `Error: ${error}`,
        );
      }
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      console.error('Failed to disconnect from the database:', error);
    }
  }
}
