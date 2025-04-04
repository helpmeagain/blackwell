import { NeurofunctionalRecord } from '@/domain/entities/specific-records/neurofunctional-record';
import { PdfGenerator } from '@/infrastructure/pdf/pdf.service';
import { Injectable } from '@nestjs/common';
import PDFDocument from "pdfkit";


@Injectable()
export class NeuroRecordPdfGenerator implements PdfGenerator<any> {
  generatePdfContent(doc: typeof PDFDocument, record: NeurofunctionalRecord): void {
    const margin = 50;
    let currentY = 100; // Espaço abaixo do cabeçalho

    // Função auxiliar para imprimir títulos de sessão
    const printSectionTitle = (title: string) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(16)
        .fillColor('#333')
        .text(title, margin, currentY);
      currentY = doc.y + 10;
      // Linha separadora
      doc.moveTo(margin, currentY)
         .lineTo(doc.page.width - margin, currentY)
         .strokeColor('#aaa')
         .stroke();
      currentY += 15;
    };

    // Função auxiliar para imprimir subtítulos
    const printSubSectionTitle = (title: string) => {
      doc
        .font('Helvetica-Bold')
        .fontSize(14)
        .fillColor('#555')
        .text(title, margin, currentY);
      currentY = doc.y + 5;
    };

    // Função auxiliar para imprimir texto de conteúdo
    const printText = (text: string) => {
      doc
        .font('Helvetica')
        .fontSize(12)
        .fillColor('#000')
        .text(text, { align: 'justify', indent: 20 });
      currentY = doc.y + 10;
    };

    // Sessão 1: Dados Clínicos
    printSectionTitle('1. Dados Clínicos');
    printSubSectionTitle('Diagnóstico Médico:');
    printText(record.medicalDiagnosis);
    printSubSectionTitle('Anamnese:');
    printText(record.anamnesis);
    printSubSectionTitle('Exame Físico:');
    printText(record.physicalExamination);
    printSubSectionTitle('Triagem:');
    printText(record.triage);

    // Sessão 2: Hábitos de Vida
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

    // Sessão 3: Sinais Vitais
    printSectionTitle('3. Sinais Vitais');
    printSubSectionTitle('Pressão Arterial:');
    printText(`${record.vitalSigns.bloodPressure} mmHg`);
    printSubSectionTitle('Frequência Cardíaca:');
    printText(`${record.vitalSigns.heartRate} bpm`);
    printSubSectionTitle('Frequência Respiratória:');
    printText(`${record.vitalSigns.respiratoryRate} rpm`);
    printSubSectionTitle('Saturação de Oxigênio:');
    printText(`${record.vitalSigns.oxygenSaturation}%`);
    printSubSectionTitle('Temperatura Corporal:');
    printText(`${record.vitalSigns.bodyTemperature} °C`);

    // Sessão 4: Inspeção Física
    printSectionTitle('4. Inspeção Física');
    printSubSectionTitle('Mobilidade Independente:');
    printText(record.physicalInspection.independentMobility ? 'Sim' : 'Não');
    printSubSectionTitle('Uso de Muletas:');
    printText(record.physicalInspection.usesCrutches ? 'Sim' : 'Não');
    printSubSectionTitle('Uso de Andador:');
    printText(record.physicalInspection.usesWalker ? 'Sim' : 'Não');
    printSubSectionTitle('Usuário de Cadeira de Rodas:');
    printText(record.physicalInspection.wheelchairUser ? 'Sim' : 'Não');
    printSubSectionTitle('Possui Cicatriz:');
    printText(record.physicalInspection.hasScar ? 'Sim' : 'Não');
    printSubSectionTitle('Possui Escara:');
    printText(record.physicalInspection.hasBedsore ? 'Sim' : 'Não');
    printSubSectionTitle('Cooperativo:');
    printText(record.physicalInspection.cooperative ? 'Sim' : 'Não');
    printSubSectionTitle('Não Cooperativo:');
    printText(record.physicalInspection.nonCooperative ? 'Sim' : 'Não');
    printSubSectionTitle('Hidratado:');
    printText(record.physicalInspection.hydrated ? 'Sim' : 'Não');
    printSubSectionTitle('Possui Hematoma:');
    printText(record.physicalInspection.hasHematoma ? 'Sim' : 'Não');
    printSubSectionTitle('Possui Edema:');
    printText(record.physicalInspection.hasEdema ? 'Sim' : 'Não');
    printSubSectionTitle('Possui Deformidade:');
    printText(record.physicalInspection.hasDeformity ? 'Sim' : 'Não');

    // Sessão 5: Avaliação Sensorial
    printSectionTitle('5. Avaliação Sensorial');
    printSubSectionTitle('Sensibilidade Superficial:');
    printText(record.sensoryAssessment.superficial);
    printSubSectionTitle('Sensibilidade Profunda:');
    printText(record.sensoryAssessment.deep);
    printSubSectionTitle('Sensações Combinadas:');
    printText(`Graphesthesia: ${record.sensoryAssessment.combinedSensations.graphesthesia ? 'Sim' : 'Não'}`);
    printText(`Barognosis: ${record.sensoryAssessment.combinedSensations.barognosis ? 'Sim' : 'Não'}`);
    printText(`Stereognosis: ${record.sensoryAssessment.combinedSensations.stereognosis ? 'Sim' : 'Não'}`);

    // Sessão 6: Mobilidade do Paciente
    printSectionTitle('6. Mobilidade do Paciente');
    printSubSectionTitle('Tempo de Caminhada de 3 Metros (segundos):');
    printText(`${record.patientMobility.threeMeterWalkTimeInSeconds} s`);
    printSubSectionTitle('Risco de Quedas:');
    printText(record.patientMobility.hasFallRisk ? 'Sim' : 'Não');
    printSubSectionTitle('Alterações de Postura:');
    const posture = record.patientMobility.postureChanges;
    printText(`Ponte: ${posture.bridge}`);
    printText(`Semi Rolamento à Direita: ${posture.semiRollRight}`);
    printText(`Semi Rolamento à Esquerda: ${posture.semiRollLeft}`);
    printText(`Rolamento Completo: ${posture.fullRoll}`);
    printText(`Arraste: ${posture.drag}`);
    printText(`Transição para Suporte com Antebraço: ${posture.proneToForearmSupport}`);
    printText(`Antebraço para Quatro Apoios: ${posture.forearmSupportToAllFours}`);
    printText(`Quatro Apoios: ${posture.allFours}`);
    printText(`Quatro Apoios para Ajoelhado: ${posture.allFoursToKneeling}`);
    printText(`Ajoelhado para Meio Ajoelhado à Direita: ${posture.kneelingToHalfKneelingRight}`);
    printText(`Ajoelhado para Meio Ajoelhado à Esquerda: ${posture.kneelingToHalfKneelingLeft}`);
    printText(`Meio Ajoelhado para em Pé à Direita: ${posture.halfKneelingRightToStanding}`);
    printText(`Meio Ajoelhado para em Pé à Esquerda: ${posture.halfKneelingLeftToStanding}`);

    // Sessão 7: Avaliação Fisioterapêutica
    printSectionTitle('7. Avaliação Fisioterapêutica');
    printSubSectionTitle('Diagnóstico:');
    printText(record.physiotherapyAssessment.diagnosis);
    printSubSectionTitle('Metas do Tratamento:');
    printText(record.physiotherapyAssessment.treatmentGoals);
    printSubSectionTitle('Conduta Fisioterapêutica:');
    printText(record.physiotherapyAssessment.physiotherapeuticConduct);

    // Rodapé
    doc.moveDown();
    doc.font('Helvetica-Oblique')
       .fontSize(10)
       .fillColor('#666')
       .text('Documento gerado automaticamente pelo GPF - Gestão de prontuários de fisioterapia', margin, doc.page.height - 50, {
         align: 'center',
       });
  }
}
