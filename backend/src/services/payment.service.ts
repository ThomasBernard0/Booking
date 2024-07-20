import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDto } from 'src/dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async handlePayment(paymentDto: PaymentDto): Promise<void> {
    try {
      await this.create(paymentDto);
    } catch {
      throw new HttpException(
        'Erreur lors du payement',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(paymentDto: PaymentDto): Promise<void> {
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
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
