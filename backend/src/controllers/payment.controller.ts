import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { PaymentService } from 'src/services/payment.service';
import { PaymentDto } from 'src/dto/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post()
  async create(@Body() paymentDto: PaymentDto): Promise<void> {
    await this.paymentsService.create(paymentDto);
  }

  @Get('price/:numberOfSchedules')
  async getPrice(
    @Param('numberOfSchedules') numberOfSchedules: number,
  ): Promise<number> {
    return this.paymentsService.getPrice(numberOfSchedules);
  }
}
