import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/infrastructure/auth/jwt-auth.guard';

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class CreateConsultationController {
  @Post()
  @ApiBearerAuth()
  @ApiTags('Consultations')
  async handle() {
    return 'ok';
  }
}
