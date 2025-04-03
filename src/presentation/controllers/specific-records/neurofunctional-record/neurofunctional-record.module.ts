import { PersistenceModule } from "@/infrastructure/persistence/persistence.module";
import { Module } from "@nestjs/common";
import { CreateNeurofunctionalRecordController } from "./create-record/create-record.controller";
import { NestCreateNeurofunctionalRecordUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/nest-create-neurofunctional-record";
import { GetByIdNeurofunctionalController } from "./get-record-by-id/get-record-by-id.controller";
import { NestGetNeurofunctionalByIdUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-id";
import { GetByPatientIdNeurofunctionalController } from "./get-record-by-patient-id/get-record-by-patient-id.controller";
import { NestGetNeurofunctionalByPatientIdUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/nest-get-record-by-patient-id";
import { FetchNeurofunctionalRecordController } from "./fetch-records-ids-by-clinician-id/fetch-records-ids-by-clinician-id.controller";
import { NestFetchNeurofunctionalIdsByClinicianIdUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/nest-fetch-neurofunctional-ids-by-clinician-id-use-case";
import { EditNeurofunctionalRecordController } from "./edit-record-by-id/edit-record.controller";
import { NestEditNeurofunctionalByIdUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/nest-edit-neurofunctional-record";
import { AskForAuthorizationController } from "./authorization/ask-for-authorization/ask-for-authorization.controller";
import { NestAskForAuthorizationUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-ask-for-authorization";
import { AuthorizeAccessController } from "./authorization/authorize-access/authorize-access.controller";
import { NestAuthorizeAccessUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-authorize-access";
import { GetPendingAuthorizationUsersController } from "./authorization/get-pending-authorization-users/get-pending-authorization-users.controller";
import { NestGetPendingAuthorizationUsersUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-get-pending-authorization";
import { RemovePendingAuthorizationController } from "./authorization/remove-pending-authorization/remove-pending-authorization.controller";
import { NestRemovePendingAuthorizationUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-remove-pending-authorization";
import { RemoveAccessController } from "./authorization/remove-access/remove-access.controller";
import { NestRemoveAccessUseCase } from "@/infrastructure/adapter/specific-records/neurofunctional-record/authorization/nest-remove-access";
import { PdfModule } from "@/infrastructure/pdf/pdf.module";
import { PdfService } from "@/infrastructure/pdf/pdf.service";
import { NeuroRecordPdfGenerator } from "@/infrastructure/pdf/specific-record/neuro";
import { GetNeuroRecordPdfController } from "./export-pdf/export-pdf.controller";

@Module({
  imports: [PersistenceModule, PdfModule],
  controllers: [
    AskForAuthorizationController,
    AuthorizeAccessController,
    GetPendingAuthorizationUsersController,
    RemovePendingAuthorizationController,
    RemoveAccessController,
    CreateNeurofunctionalRecordController,
    GetByIdNeurofunctionalController,
    GetByPatientIdNeurofunctionalController,
    FetchNeurofunctionalRecordController,
    EditNeurofunctionalRecordController,
    GetNeuroRecordPdfController,
  ],
  providers: [
    NestAskForAuthorizationUseCase,
    NestAuthorizeAccessUseCase,
    NestGetPendingAuthorizationUsersUseCase,
    NestRemovePendingAuthorizationUseCase,
    NestRemoveAccessUseCase,
    NestCreateNeurofunctionalRecordUseCase,
    NestGetNeurofunctionalByIdUseCase,
    NestGetNeurofunctionalByPatientIdUseCase,
    NestFetchNeurofunctionalIdsByClinicianIdUseCase,
    NestEditNeurofunctionalByIdUseCase,
    PdfService,
    NeuroRecordPdfGenerator,
  ],
})
export class NeurofunctionalRecordModule {}
