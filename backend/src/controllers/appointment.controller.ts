import { Controller, Post, Body } from '@nestjs/common';
import { AppointmentService } from 'src/services/appointment.service';
import { Appointment } from '@prisma/client';
import { AppointmentDto } from 'src/dto/appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() appointmentDto: AppointmentDto): Promise<Appointment> {
    return this.appointmentService.create(appointmentDto);
  }
}
