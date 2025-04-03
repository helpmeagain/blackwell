import { Module } from "@nestjs/common";
import { PdfService } from "./pdf.service";
import { OrthopedicRecordPdfGenerator } from "./specific-record/trauma";
import { NeuroRecordPdfGenerator } from "./specific-record/neuro";
import { CardiorespiratoryRecordPdfGenerator } from "./specific-record/cardio";

@Module({
  providers: [
    PdfService,
    OrthopedicRecordPdfGenerator,
    NeuroRecordPdfGenerator,
    CardiorespiratoryRecordPdfGenerator,
  ],
  exports: [
    PdfService,
    OrthopedicRecordPdfGenerator,
    NeuroRecordPdfGenerator,
    CardiorespiratoryRecordPdfGenerator,
  ],
})
export class PdfModule {}
