import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDto } from 'src/dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

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
      include: {
        appointment: true,
      },
    });
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
