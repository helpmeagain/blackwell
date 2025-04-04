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
import { NestGetTraumaOrthopedicByIdUseCase } from "@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-get-record-by-id";
import { OrthopedicRecordPdfGenerator } from "@/infrastructure/pdf/specific-record/trauma";

@Controller("trauma-orthopedic-record/export-pdf/:id")
@ApiTags("Specific records - Trauma Orthopedic Record")
export class GetTraumaRecordPdfController {
  constructor(
    private readonly getById: NestGetTraumaOrthopedicByIdUseCase,
    private readonly pdfService: PdfService,
    private readonly generator: OrthopedicRecordPdfGenerator
  ) {}

  @Get()
  @ApiOperation({
    summary: "Export a PDF file of a trauma orthopedic record by id",
    description:
      "Generate and return a PDF file with trauma orthopedic record.",
  })
  @ApiBearerAuth()
  @ApiOkResponse({ description: "Return a PDF file of the record" })
  @ApiNotFoundResponse({ description: "Record not found" })
  @ApiUnauthorizedResponse({ description: "User not authorized" })
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

    const { traumaorthopedicRecord } = result.value;

    try {
      const pdfBuffer = await this.pdfService.generatePdf(
        traumaorthopedicRecord,
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
