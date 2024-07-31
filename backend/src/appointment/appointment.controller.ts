import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppointmentService } from 'src/appointment/appointment.service';
import { ScheduleDto } from './schedule.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('schedules')
  async getAllSchedule(@Query('date') date: string): Promise<ScheduleDto[]> {
    return this.appointmentService.getAllSchedules(date);
  }
}
