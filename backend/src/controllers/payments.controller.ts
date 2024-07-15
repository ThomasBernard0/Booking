import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { PaymentsService } from 'src/services/appointment.service';
import { ScheduleDto } from 'src/dto/schedule.dto';
import { PaymentDto } from 'src/dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() paymentDto: PaymentDto[]): Promise<void> {
    await this.paymentsService.create(paymentDto);
  }

  @Get('price')
  async getAllSchedule(@Query('date') date: string): Promise<ScheduleDto[]> {
    return this.paymentsService.getPrice(date);
  }
}
