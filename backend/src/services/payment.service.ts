import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from './email.service';
import { PaymentDto } from 'src/dto/payment.dto';
import { formatDateToFrenchLocale, getHours } from 'src/utils/dateUtils';

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
      const codes = this.getCode(paymentDto);
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
          appointment: {
            create: paymentDto.appointment.map((a) => ({
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

  getCode(paymentDto: PaymentDto): { date: string; code: string }[] {
    const codes = paymentDto.appointment.map((appointmen) => {
      let date = formatDateToFrenchLocale(appointmen.startDate);
      date += '  ';
      date += getHours(appointmen.startDate);
      date += ' - ';
      date += getHours(appointmen.endDate);
      let code = 'ABCDEFGHIJKLMNOP' + ' ' + appointmen.startDate;
      return { date, code };
    });
    return codes;
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
