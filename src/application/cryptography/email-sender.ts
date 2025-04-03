export abstract class EmailSender {
  abstract sendForgotPasswordEmail(email: string, token: string): Promise<void>;
}