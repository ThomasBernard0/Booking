import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EMAIL_TEMPLATES } from 'src/utils/constants/email.constants';
import { InvalidEmailException } from '../errors/InvalidEmailException';
import { EmailSendFailedException } from '../errors/EmailSendFailedException';

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

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    if (!this.isValidEmail(to)) {
      throw new InvalidEmailException(to);
    }

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"Booking" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new EmailSendFailedException(to, error.message);
    }
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
      throw new EmailSendFailedException(to, error.message);
    }
  }
}
