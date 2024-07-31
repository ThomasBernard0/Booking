import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AppointmentService } from 'src/appointment/appointment.service';
import { ScheduleDto } from './schedule.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('schedules')
  async getAllSchedule(@Query('date') date: string): Promise<ScheduleDto[]> {
    return this.appointmentService.getAllSchedules(date);
  }
}
