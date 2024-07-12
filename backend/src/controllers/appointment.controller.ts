import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AppointmentService } from 'src/services/appointment.service';
import { AppointmentDto } from 'src/dto/appointment.dto';
import { ScheduleDto } from 'src/dto/schedule.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('create-list')
  async create(@Body() appointmentListDto: AppointmentDto[]): Promise<void> {
    await this.appointmentService.createMany(appointmentListDto);
  }

  @Get('schedules-list')
  async getAllSchedule(@Query('date') date: string): Promise<ScheduleDto[]> {
    return this.appointmentService.getAllSchedules(date);
  }
}
