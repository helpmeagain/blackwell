import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
  Res,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Response } from "express";
import { CurrentUser } from "@/infrastructure/auth/current-user-decorator";
import { UserPayload } from "@/infrastructure/auth/jwt.strategy";
import { PdfService } from "@/infrastructure/pdf/pdf.service";
import { BadRequest } from "@/application/common/error-handler/errors/bad-request";
import { ResourceNotFound } from "@/application/common/error-handler/errors/resource-not-found";
import { UnauthorizedUser } from "@/application/common/error-handler/errors/unauthorized";
import { NestGetNeurofunctionalByIdUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-id";
import { NeuroRecordPdfGenerator } from "@/infrastructure/pdf/specific-record/neuro";

@Controller("neurofunctional-record/export-pdf/:id")
@ApiTags("Specific records - Neurofunctional Record")
export class GetNeuroRecordPdfController {
  constructor(
    private readonly getById: NestGetNeurofunctionalByIdUseCase,
    private readonly pdfService: PdfService,
    private readonly generator: NeuroRecordPdfGenerator
  ) {}

  @Get()
  @ApiOperation({
    summary: "Obter PDF de um registro genérico por ID",
    description:
      "Gera e retorna um PDF com os detalhes do registro especificado.",
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: "Retorna o PDF do registro" })
  @ApiNotFoundResponse({ description: "Registro não encontrado" })
  @ApiUnauthorizedResponse({ description: "Usuário não autorizado" })
  async handle(
    @Param("id") id: string,
    @CurrentUser() user: UserPayload,
    @Res() res: Response
  ) {
    const result = await this.getById.execute({ id, currentUserId: user.sub });

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

    try {
      const pdfBuffer = await this.pdfService.generatePdf(
        neurofunctionalRecord,
        this.generator
      );

      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=record-cardio-${id}.pdf`,
        "Content-Length": pdfBuffer.length,
      });

      return res.send(pdfBuffer);
    } catch (error) {
      throw new BadRequest("Falha ao gerar o PDF.");
    }
  }
}
