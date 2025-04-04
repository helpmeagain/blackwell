import { PdfGenerator } from '@/infrastructure/pdf/pdf.service';
import { CardiorespiratoryRecord } from '@/domain/entities/specific-records/cardiorespiratory-record';
import { Injectable } from '@nestjs/common';
import PDFDocument from "pdfkit";

@Injectable()
export class CardiorespiratoryRecordPdfGenerator implements PdfGenerator<CardiorespiratoryRecord> {
  generatePdfContent(doc: typeof PDFDocument, record: CardiorespiratoryRecord): void {

    const margin = 50;
    let currentY = 100;

    const printSectionTitle = (title: string) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('#333')
        .text(title, margin, currentY);
      currentY = doc.y + 10;
      doc.moveTo(margin, currentY).lineTo(doc.page.width - margin, currentY).strokeColor('#aaa').stroke();
      currentY += 15;
    };

    const printSubSectionTitle = (title: string) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#555')
        .text(title, margin, currentY);
      currentY = doc.y + 5;
    };

    const printText = (text: string) => {
      doc
        .font('Helvetica')
        .fontSize(12)
        .fillColor('#000')
        .text(text, { align: 'justify', indent: 20 });
      currentY = doc.y + 10;
    };

    printSectionTitle('1. Dados Clínicos');
    printSubSectionTitle('Diagnóstico Médico:');
    printText(record.medicalDiagnosis);
    printSubSectionTitle('Anamnese:');
    printText(record.anamnesis);
    printSubSectionTitle('Exame Físico:');
    printText(record.physicalExamination);
    printSubSectionTitle('Triagem:');
    printText(record.triage);

    printSectionTitle('2. Hábitos de Vida');
    printSubSectionTitle('Consumo de Álcool:');
    printText(record.lifestyleHabits.alcoholConsumption ? 'Sim' : 'Não');
    printSubSectionTitle('Tabagismo:');
    printText(record.lifestyleHabits.smoker ? 'Sim' : 'Não');
    printSubSectionTitle('Obesidade:');
    printText(record.lifestyleHabits.obesity ? 'Sim' : 'Não');
    printSubSectionTitle('Diabetes:');
    printText(record.lifestyleHabits.diabetes ? 'Sim' : 'Não');
    printSubSectionTitle('Uso de Drogas:');
    printText(record.lifestyleHabits.drugUser ? 'Sim' : 'Não');
    printSubSectionTitle('Atividade Física:');
    printText(record.lifestyleHabits.physicalActivity ? 'Sim' : 'Não');

    // Sessão 3: Inspeção Física
    printSectionTitle('3. Inspeção Física');
    printSubSectionTitle('Sensibilidade à palpação facial:');
    printText(record.physicalInspection.isFaceSinusPalpationHurtful ? 'Sim' : 'Não');
    printSubSectionTitle('Secreção Nasal:');
    printText(`Tipo: ${record.physicalInspection.nasalSecretion.type}`);
    printText(`Fétido: ${record.physicalInspection.nasalSecretion.isFetid ? 'Sim' : 'Não'}`);
    printText(`Quantidade: ${record.physicalInspection.nasalSecretion.quantity}`);
    printSubSectionTitle('Coceira nasal:');
    printText(record.physicalInspection.nasalItching);
    printSubSectionTitle('Espirros:');
    printText(record.physicalInspection.sneezing);
    printSubSectionTitle('Tipo de Tórax:');
    printText(record.physicalInspection.chestType);
    printSubSectionTitle('Sinais respiratórios ou cardíacos:');
    printText(record.physicalInspection.respiratoryOrCardiacSigns);

    // Sessão 4: Sinais Vitais
    printSectionTitle('4. Sinais Vitais');
    printSubSectionTitle('Frequência Cardíaca:');
    printText(`${record.vitalSigns.heartRate} bpm`);
    printSubSectionTitle('Frequência Respiratória:');
    printText(`${record.vitalSigns.respiratoryRate} rpm`);
    printSubSectionTitle('Pressão Arterial:');
    printText(`Sistólica: ${record.vitalSigns.bloodPressure.systolic} mmHg - Diastólica: ${record.vitalSigns.bloodPressure.diastolic} mmHg`);
    printSubSectionTitle('Temperatura:');
    printText(`${record.vitalSigns.temperature} °C`);
    printSubSectionTitle('Saturação de Oxigênio:');
    printText(`${record.vitalSigns.oxygenSaturation}%`);

    // Sessão 5: Avaliação Pneumofuncional
    printSectionTitle('5. Avaliação Pneumofuncional');
    printSubSectionTitle('Fluxo de Pico:');
    printText(`Medição 1: ${record.pneumofunctionalAssessment.peakFlow.firstMeasurement}`);
    printText(`Medição 2: ${record.pneumofunctionalAssessment.peakFlow.secondMeasurement}`);
    printText(`Medição 3: ${record.pneumofunctionalAssessment.peakFlow.thirdMeasurement}`);
    printSubSectionTitle('Manovacuometria - PEMAX:');
    printText(`Medição 1: ${record.pneumofunctionalAssessment.manovacuometry.pemax.firstMeasurement}`);
    printText(`Medição 2: ${record.pneumofunctionalAssessment.manovacuometry.pemax.secondMeasurement}`);
    printText(`Medição 3: ${record.pneumofunctionalAssessment.manovacuometry.pemax.thirdMeasurement}`);
    printSubSectionTitle('Manovacuometria - PIMAX:');
    printText(`Medição 1: ${record.pneumofunctionalAssessment.manovacuometry.pimax.firstMeasurement}`);
    printText(`Medição 2: ${record.pneumofunctionalAssessment.manovacuometry.pimax.secondMeasurement}`);
    printText(`Medição 3: ${record.pneumofunctionalAssessment.manovacuometry.pimax.thirdMeasurement}`);

    // Sessão 6: Avaliação Cardiofuncional
    printSectionTitle('6. Avaliação Cardiofuncional');
    printSubSectionTitle('IMC:');
    printText(`${record.cardiofunctionalAssessment.bmi}`);
    printSubSectionTitle('Perímetro Abdominal:');
    printText(`${record.cardiofunctionalAssessment.abdominalPerimeter} cm`);
    printSubSectionTitle('Relação cintura-quadril:');
    printText(`${record.cardiofunctionalAssessment.waistHipRatio}`);
    printSubSectionTitle('Bioimpedância:');
    printText(`Gordura corporal: ${record.cardiofunctionalAssessment.bioimpedance.bodyFat}%`);
    printText(`Gordura visceral: ${record.cardiofunctionalAssessment.bioimpedance.visceralFat}%`);
    printText(`Massa muscular: ${record.cardiofunctionalAssessment.bioimpedance.muscleMassPercentage}%`);
    printSubSectionTitle('Adipometria - Dobra cutânea:');
    printText(`Bicipital: ${record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.bicipital} mm`);
    printText(`Tricipital: ${record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.tricipital} mm`);
    printText(`Subescapular: ${record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.subscapular} mm`);
    printText(`Abdominal: ${record.cardiofunctionalAssessment.adipometry.skinfoldMeasurements.abdominal} mm`);

    // Finaliza com rodapé ou observações, se necessário.
    doc.moveDown();
    doc.font('Helvetica-Oblique').fontSize(10).fillColor('#666')
      .text('Documento gerado automaticamente pelo GPF - Gestão de prontuários de fisioterapia', margin, doc.page.height - 50, {
        align: 'center',
      });
  }
}
