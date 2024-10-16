import { Controller, NotFoundException, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestAuthorizeAccessUseCase } from '@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-authorize-access';

@Controller('neurofunctional-record/authorize-access/record-id/:id/user-id/:userId')
export class AuthorizeAccessUseCaseController {
  constructor(private authorizeAccessUseCase: NestAuthorizeAccessUseCase) {}

  @Post()
  @ApiTags('Neurofunctional Record')
  @ApiOperation({
    summary: 'Authorize access for record',
    description: 'Insert an record Id and User Id',
  })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Suceessfully authorized',
  })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(@Param('id') id: string, @Param('userId') userId: string) {
    const result = await this.authorizeAccessUseCase.execute({
      recordId: id,
      userId,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }
  }
}
