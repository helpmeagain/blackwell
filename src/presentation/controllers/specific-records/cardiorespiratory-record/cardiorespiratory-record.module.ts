import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { Module } from "@nestjs/common";
import { CreateCardiorespiratoryRecordController } from "./create-record/create-record.controller";
import { NestCreateCardiorespiratoryRecordUseCase } from "@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-create-record";
import { GetByIdCardiorespiratoryController } from "./get-record-by-id/get-record-by-id.controller";
import { NestGetCardiorespiratoryByIdUseCase } from "@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-get-record-by-id";
import { GetByPatientIdCardiorespiratoryController } from "./get-record-by-patient-id/get-record-by-patient-id.controller";
import { NestGetCardiorespiratoryByPatientIdUseCase } from "@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-get-record-by-patient-id";
import { FetchCardiorespiratoryRecordController } from "./fetch-records-ids-by-clinician-id/fetch-records-by-clinician-id.controller";
import { NestFetchCardiorespiratoryIdsByClinicianIdUseCase } from "@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-fetch-records-ids-by-clinician-id-use-case";
import { EditCardiorespiratoryRecordController } from "./edit-record-by-id/edit-record-by-id.controller";
import { NestEditCardiorespiratoryByIdUseCase } from "@/infrastructure/adapter/specific-records/cardiorespiratory-record/nest-edit-record";

@Module({
  imports: [PersistenceModule],
  controllers: [
    CreateCardiorespiratoryRecordController, 
    GetByIdCardiorespiratoryController, 
    GetByPatientIdCardiorespiratoryController,
    FetchCardiorespiratoryRecordController,
    EditCardiorespiratoryRecordController
  ],
  providers: [
    NestCreateCardiorespiratoryRecordUseCase, 
    NestGetCardiorespiratoryByIdUseCase,
    NestGetCardiorespiratoryByPatientIdUseCase,
    NestFetchCardiorespiratoryIdsByClinicianIdUseCase,
    NestEditCardiorespiratoryByIdUseCase,
  ]
})
export class CardiorespiratoryRecordModule {}