import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDto } from 'src/dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async handlePayment(paymentDto: PaymentDto): Promise<void> {
    try {
      await this.processPayment();
      await this.createPayment(paymentDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async processPayment(): Promise<void> {
    try {
      if (Math.floor(Math.random() * 10) > -1) {
        throw new Error();
      }
    } catch (error) {
      throw new InternalServerErrorException('Echec lors du payement');
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
        `Echec lors de l'envoi de l'email`,
      );
    }
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
