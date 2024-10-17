import {
  ConflictException,
  Controller,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestAskForAuthorizationUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-ask-for-authorization';
import { detailedDescription } from './ask-for-authorization-schema';
import { UserAlreadyMadeRequest } from '@/application/common/error-handler/errors/user-already-made-request';

@Controller('neurofunctional-record/ask-for-authorization/record-id/:id/user-id/:userId')
export class AskForAuthorizationController {
  constructor(private getAskForAuthorizationUseCase: NestAskForAuthorizationUseCase) {}

  @Patch()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Ask for authorization',
    description: detailedDescription,
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Suceessfully asked for authorization',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string, @Param('userId') userId: string) {
    const result = await this.getAskForAuthorizationUseCase.execute({
      recordId: id,
      userId,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        case UserAlreadyMadeRequest:
          throw new ConflictException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }
  }
}
