import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EMAIL_TEMPLATES } from 'src/utils/constants/email.constants';

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
      from: `"Booking" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };
    await this.transporter.sendMail(mailOptions);
  }

  public async sendBookingConfirmation(
    codes: { date: string; code: string }[],
    to: string,
  ): Promise<void> {
    try {
      const subject = EMAIL_TEMPLATES.DIGICODE_CODE.subject;
      const text = EMAIL_TEMPLATES.DIGICODE_CODE.text(codes);
      const html = EMAIL_TEMPLATES.DIGICODE_CODE.html(codes);
      await this.sendMail(to, subject, text, html);
    } catch (error) {
      throw new InternalServerErrorException(
        `Echec lors de l'envoi de l'email`,
      );
    }
  }
}
