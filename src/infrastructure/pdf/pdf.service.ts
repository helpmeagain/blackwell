import { Injectable } from "@nestjs/common";
import PDFDocument from "pdfkit";

export interface PdfGenerator<T> {
  generatePdfContent(doc: typeof PDFDocument, data: T): void;
}

@Injectable()
export class PdfService {
  generatePdf<T>(data: T, generator: PdfGenerator<T>): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      this.addHeader(doc);

      generator.generatePdfContent(doc, data);

      doc.end();
    });
  }

  private addHeader(doc: typeof PDFDocument) {
    const logoPath = "src/presentation/utils/images/logo.png";
    const headerText = "GPF - Gestão de prontuários de fisioterapia";
    const pageWidth = doc.page.width;
    const margin = 50;
    
    const logoWidth = 100;
    const logoHeight = (76 / 200) * logoWidth;
    doc.image(logoPath, margin, 30, { width: logoWidth, height: logoHeight });

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text(headerText, margin + logoWidth + 10, 45, {
        width: pageWidth - margin * 2 - logoWidth - 10,
        align: "left",
      });

    doc.moveTo(margin, 90).lineTo(pageWidth - margin, 90).stroke();
  }
}
