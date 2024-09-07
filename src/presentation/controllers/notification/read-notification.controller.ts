import { Controller, HttpCode, NotFoundException, Param, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { NestReadNotificationUseCase } from '@/infrastructure/adapter/notification/nest-read-notification-use-case';
import { NotAllowed } from '@/application/common/error-handler/errors/not-allowed';

@Controller('notification/:notificationId/patient/:patientId/read')
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
    @Param('patientId') patientId: string,
  ) {
    const result = await this.readNotification.execute({
      notificationId,
      recipientId: patientId,
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFound:
          throw new NotFoundException(error.message);
        case NotAllowed:
          throw new NotAllowed();
        default:
          throw new BadRequest(error.message);
      }
    }
  }
}
