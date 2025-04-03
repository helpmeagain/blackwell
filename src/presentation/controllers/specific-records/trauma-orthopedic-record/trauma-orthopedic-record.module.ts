import { NestCreateTraumaOrthopedicRecordUseCase } from "@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-create-record";
import { NestEditTraumaOrthopedicByIdUseCase } from "@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-edit-record";
import { NestFetchTraumaOrthopedicIdsByClinicianIdUseCase } from "@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-fetch-records-ids-by-clinician-id-use-case";
import { NestGetTraumaOrthopedicByIdUseCase } from "@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-get-record-by-id";
import { NestGetTraumaOrthopedicByPatientIdUseCase } from "@/infrastructure/adapter/specific-records/trauma-orthopedic-record/nest-get-record-by-patient-id";
import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { Module } from "@nestjs/common";
import { CreateTraumaOrthopedicRecordController } from "./create-record/create-record.controller";
import { EditTraumaOrthopedicRecordController } from "./edit-record-by-id/edit-record-by-id.controller";
import { FetchTraumaOrthopedicRecordController } from "./fetch-records-ids-by-clinician-id/fetch-records-by-clinician-id.controller";
import { GetByIdTraumaOrthopedicController } from "./get-record-by-id/get-record-by-id.controller";
import { GetByPatientIdTraumaOrthopedicController } from "./get-record-by-patient-id/get-record-by-patient-id.controller";
import { GetTraumaRecordPdfController } from "./export-pdf/export-pdf.controller";
import { PdfModule } from "@/infrastructure/pdf/pdf.module";

@Module({
  imports: [PersistenceModule, PdfModule],
  controllers: [
    CreateTraumaOrthopedicRecordController,
    EditTraumaOrthopedicRecordController,
    FetchTraumaOrthopedicRecordController,
    GetByIdTraumaOrthopedicController,
    GetByPatientIdTraumaOrthopedicController,
    GetTraumaRecordPdfController,
  ],
  providers: [
    NestCreateTraumaOrthopedicRecordUseCase, 
    NestGetTraumaOrthopedicByIdUseCase,
    NestGetTraumaOrthopedicByPatientIdUseCase,
    NestFetchTraumaOrthopedicIdsByClinicianIdUseCase,
    NestEditTraumaOrthopedicByIdUseCase,
  ]
})
export class TraumaOrthopedicRecordModule {}