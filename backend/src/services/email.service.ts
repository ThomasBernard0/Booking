import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"test" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendConfirmationMail(to: string): Promise<void> {
    try {
      const subject = 'Hi';
      const text = 'Hello';
      const html = '';
      await this.sendMail(to, subject, text, html);
    } catch (error) {
      throw new InternalServerErrorException(
        `Echec lors de l'envoi de l'email`,
      );
    }
  }
}
