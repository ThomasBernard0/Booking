import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDto } from './payment.dto';
import { formatDateToFrenchLocale, getHours } from 'src/utils/dateUtils';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async handlePayment(paymentDto: PaymentDto): Promise<void> {
    try {
      await this.processPayment();
      await this.createPayment(paymentDto);
      const codes = this.getCodes(paymentDto);
      await this.emailService.sendConfirmationMail(codes, paymentDto.email);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async processPayment(): Promise<void> {
    try {
      if (Math.floor(Math.random() * 10) <= 1) {
        throw new Error();
      }
    } catch (error) {
      throw new InternalServerErrorException('Echec lors de la transaction');
    }
  }

  async createPayment(paymentDto: PaymentDto): Promise<void> {
    try {
      await this.prisma.payment.create({
        data: {
          price: paymentDto.price,
          email: paymentDto.email,
          appointments: {
            create: paymentDto.appointments.map((a) => ({
              startDate: a.startDate,
              endDate: a.endDate,
            })),
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Echec lors de l'envoi l'écriture du paiement`,
      );
    }
  }

  getCodes(paymentDto: PaymentDto): { date: string; code: string }[] {
    const sortedAppointments = paymentDto.appointments.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
    const codes = sortedAppointments.map((appointment) => {
      let date = formatDateToFrenchLocale(appointment.startDate);
      date += '  ';
      date += getHours(appointment.startDate);
      date += ' - ';
      date += getHours(appointment.endDate);
      let code = this.createCode(appointment.startDate);
      return { date, code };
    });
    return codes;
  }

  createCode(date: Date): string {
    const combinedString = process.env.CODE_HASH + new Date(date).toISOString();
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
      const char = combinedString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    hash = Math.abs(hash);
    let fourDigitCode = (hash % 10000).toString();
    fourDigitCode = fourDigitCode.padStart(4, '0');
    return fourDigitCode;
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
