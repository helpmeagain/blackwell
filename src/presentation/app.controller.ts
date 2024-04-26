import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from '@/infrastructure/persistence/prisma/prisma.service';

@Controller('/api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('/clinician')
  async getClinician() {
    return await this.prismaService.clinician.findMany();
  }
}
