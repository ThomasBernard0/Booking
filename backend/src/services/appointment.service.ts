import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment } from '@prisma/client';
import { AppointmentDto } from 'src/dto/appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(appointmentListDto: AppointmentDto[]): Promise<void> {
    const createManyPromises = appointmentListDto.map(async (appointment) => {
      await this.prisma.appointment.create({
        data: {
          date: new Date(appointment.date),
          email: appointment.email,
        },
      });
    });
    await Promise.all(createManyPromises);
  }
}
