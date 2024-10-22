import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestGetNeurofunctionalByIdUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-id';
import { ReturnNeurofunctionalePresenter } from '@/presentation/utils/presenters/return-neurofunctional-record-presenter';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';
import { detailedDescription } from './get-record-by-id-schema';

@Controller('neurofunctional-record/by-id/:id')
export class GetByIdNeurofunctionalController {
  constructor(private getById: NestGetNeurofunctionalByIdUseCase) {}

  @Get()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Get a neurofunctional record by id',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Return neurofunctional record by id' })
  @ApiNotFoundResponse({ description: 'Neurofunctional Record not found' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string, @CurrentUser() user: UserPayload) {
    const result = await this.getById.execute({
      id,
      currentUserId: user.sub,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        case UnauthorizedUser:
          throw new UnauthorizedException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }

    const { neurofunctionalRecord } = result.value;

    return {
      record: ReturnNeurofunctionalePresenter.toHTTP(neurofunctionalRecord),
    };
  }
}
