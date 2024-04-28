import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/infrastructure/auth/jwt-auth.guard';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';

@Controller('consultations')
@UseGuards(JwtAuthGuard)
export class CreateConsultationController {
  constructor() {}

  @Post()
  @ApiBearerAuth()
  @ApiTags('Consultations')
  async handle(@CurrentUser() user: UserPayload) {
    console.log(user);
    return 'ok';
  }
}
