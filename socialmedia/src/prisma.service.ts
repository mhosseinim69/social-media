import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.handleAppCloseOnBeforeExit(app);
  }

  private handleAppCloseOnBeforeExit(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}