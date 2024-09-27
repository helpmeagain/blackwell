import { Public } from '@/infrastructure/auth/public';
import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class IndexController {
  @Get()
  @Redirect('/api', 302)
  @Public()
  redirectToApi() {}
}
