import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentDto } from 'src/dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async handlePayment(
    paymentDto: PaymentDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.create(paymentDto);
      return {
        success: true,
        message: 'La payement a été validé',
      };
    } catch {
      throw new HttpException(
        'Erreur lors du payement',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(paymentDto: PaymentDto): Promise<void> {
    this.prisma.$transaction(async (prisma) => {
      await prisma.payment.create({
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
    });
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
