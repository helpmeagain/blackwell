import {
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExcludeController,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BadRequest } from '@/application/common/error-handler/errors/bad-request';
import { ResourceNotFound } from '@/application/common/error-handler/errors/resource-not-found';
import { ReturnUniversalMedicalRecordPresenter } from '@/presentation/utils/presenters/return-universal-medical-record-presenter';
import {
  BodyType,
  swaggerBody,
  validationBody,
} from './edit-medical-record-by-id-schema';
import { NestEditUniversalMedicalRecordByIdUseCase } from '@/infrastructure/adapter/universal-medical-record/nest-edit-universal-medical-record-by-id-use-case';
import { CurrentUser } from '@/infrastructure/auth/current-user-decorator';
import { UserPayload } from '@/infrastructure/auth/jwt.strategy';
import { UnauthorizedUser } from '@/application/common/error-handler/errors/unauthorized';

@ApiExcludeController()
@Controller('universal-medical-record/:id')
export class EditMedicalRecordByIdController {
  constructor(private editMedicalRecordById: NestEditUniversalMedicalRecordByIdUseCase) {}

  @Put()
  @ApiTags('Universal Medical Record')
  @ApiOperation({ summary: 'Edit a universal medical record by id' })
  @ApiBearerAuth()
  @ApiBody({ schema: swaggerBody })
  @ApiOkResponse({ description: 'Return universal medical record by id' })
  @ApiUnauthorizedResponse({ description: 'Not authorized to access this route' })
  async handle(
    @Body(validationBody) body: typeof BodyType,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      diagnosis,
      profession,
      emergencyContactEmail,
      emergencyContactNumber,
      allergies,
      maritalStatus,
      height,
      weight,
      medicationsInUse,
    } = body;
    const result = await this.editMedicalRecordById.execute({
      universalMedicalRecordId: id,
      currentUserId: user.sub,
      diagnosis,
      profession,
      emergencyContactEmail,
      emergencyContactNumber,
      allergies,
      maritalStatus,
      height,
      weight,
      medicationsInUse,
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

    const { universalMedicalRecord } = result.value;

    return {
      universalMedicalRecord:
        ReturnUniversalMedicalRecordPresenter.toHTTP(universalMedicalRecord),
    };
  }
}
