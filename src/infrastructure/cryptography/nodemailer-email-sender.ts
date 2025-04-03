import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailSender } from '@/application/cryptography/email-sender';
import { EnvService } from '../env/env.service';

@Injectable()
export class NodemailerEmailSender implements EmailSender {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(NodemailerEmailSender.name);

  constructor(env: EnvService) {
    this.transporter = nodemailer.createTransport({
      host: env.get('EMAIL_HOST'),
      port: Number(env.get('EMAIL_PORT')) || 587,
      auth: {
        user: env.get('EMAIL_USER'),
        pass: env.get('EMAIL_PASS'),
      },
    });
  }

  async sendForgotPasswordEmail(email: string, token: string): Promise<void> {
    const resetLink = `${process.env.FRONTEND_URL}reset-password/new-password/${token}`;

    const mailOptions: nodemailer.SendMailOptions = {
      from: "suporte",
      to: email,
      subject: 'Redefinição de Senha',
      html: `
        <p>Você solicitou a redefinição de senha.</p>
        <p>Clique no link abaixo para criar uma nova senha:</p>
        <p><a href="${resetLink}">Redefinir Senha</a></p>
        <p>Se você não solicitou essa ação, por favor ignore este e-mail.</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`E-mail de redefinição de senha enviado para ${email}`);
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail para ${email}`, error);
      throw error;
    }
  }
}
