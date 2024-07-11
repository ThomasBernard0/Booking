import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Appointment } from '@prisma/client';
import { AppointmentDto } from 'src/dto/appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(appointmentDto: AppointmentDto): Promise<Appointment> {
    return this.prisma.appointment.create({
      data: {
        date: new Date(appointmentDto.date),
        email: appointmentDto.email,
      },
    });
  }
}
