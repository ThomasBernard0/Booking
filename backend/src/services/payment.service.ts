import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentDto } from 'src/dto/appointment.dto';
import { ScheduleDto } from 'src/dto/schedule.dto';
import getDefaultAvailabilityByDay from 'src/utils/availability';
import { createDateTime, createDateTimeWithHours } from 'src/utils/dateUtils';
import { PaymentDto } from 'src/dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(paymentDto: PaymentDto): Promise<void> {
    const payment = await this.prisma.payment.create({
        data: {
          price: paymentDto.price,
          email: paymentDto.email,
          appointment: {
            create: paymentDto.appointment.map(a => ({
              dateDebut: a.dateDebut,
              dateFin: a.dateFin,
            })),
          },
        },
        include: {
            appointment: true,
        },
      });
  }

  async getPrice(date: string): Promise<ScheduleDto[]> {
}
