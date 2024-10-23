import {
  Controller,
  HttpCode,
  MethodNotAllowedException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExcludeController,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestReadNotificationUseCase } from '@/infrastructure/adapter/notification/nest-read-notification-use-case';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';

@ApiExcludeController()
@Controller('notification/read/:notificationId')
export class ReadNotificationController {
  constructor(private readNotification: NestReadNotificationUseCase) {}

  @Patch()
  @ApiTags('Notification')
  @ApiOperation({ summary: 'Read a notification' })
  @HttpCode(204)
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Return a notification' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Param('notificationId') notificationId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user.sub;

    const result = await this.readNotification.execute({
      notificationId,
      recipientId: userId,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        case NotAllowed:
          throw new MethodNotAllowedException(error.message);
        default:
          throw new BadRequest(error.message);
      }
    }
  }
}
