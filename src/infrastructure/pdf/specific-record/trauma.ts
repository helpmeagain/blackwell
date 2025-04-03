import { PdfGenerator } from '@/infrastructure/pdf/pdf.service';
import { Injectable } from '@nestjs/common';
import PDFDocument from "pdfkit";

@Injectable()
export class OrthopedicRecordPdfGenerator implements PdfGenerator<any> {
  generatePdfContent(doc: typeof PDFDocument, record: any): void {
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

    // Sessão 2: Avaliação Palpatória e Edema
    printSectionTitle('2. Avaliação Palpatória e Edema');
    printSubSectionTitle('Palpação:');
    printText(record.palpation);
    printSubSectionTitle('Edema:');
    printText(record.edema ? 'Presente' : 'Ausente');
    printSubSectionTitle('Teste de Pitting:');
    printText(record.pittingTest ? 'Positivo' : 'Negativo');
    printSubSectionTitle('Teste de Pressão Digital:');
    printText(record.fingerPressureTest ? 'Positivo' : 'Negativo');

    // Sessão 3: Perimetria
    printSectionTitle('3. Perimetria');
    printSubSectionTitle('Braço Direito:');
    printText(`${record.perimetry.rightArm} cm`);
    printSubSectionTitle('Braço Esquerdo:');
    printText(`${record.perimetry.leftArm} cm`);
    printSubSectionTitle('Coxa Superior Direita:');
    printText(`${record.perimetry.upperRightThigh} cm`);
    printSubSectionTitle('Coxa Superior Esquerda:');
    printText(`${record.perimetry.upperLeftThigh} cm`);
    printSubSectionTitle('Coxa Inferior Direita:');
    printText(`${record.perimetry.lowerRightThigh} cm`);
    printSubSectionTitle('Coxa Inferior Esquerda:');
    printText(`${record.perimetry.lowerLeftThigh} cm`);
    printSubSectionTitle('Joelho Direito:');
    printText(`${record.perimetry.rightKnee} cm`);
    printSubSectionTitle('Joelho Esquerdo:');
    printText(`${record.perimetry.leftKnee} cm`);

    // Sessão 4: Avaliação Subjetiva da Dor
    printSectionTitle('4. Avaliação Subjetiva da Dor');
    printSubSectionTitle('Intensidade:');
    printText(`${record.subjectivePainAssessment.intensity} (escala de 0 a 10)`);
    printSubSectionTitle('Localização:');
    printText(record.subjectivePainAssessment.location);
    printSubSectionTitle('Característica:');
    printText(record.subjectivePainAssessment.characteristic);

    // Sessão 5: Teste Ortopédico Especial
    printSectionTitle('5. Teste Ortopédico Especial');
    printSubSectionTitle('Descrição:');
    printText(record.specialOrthopedicTest);

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
