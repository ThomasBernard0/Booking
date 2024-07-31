import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Post()
  async handlePayment(@Body() paymentDto: PaymentDto): Promise<void> {
    await this.paymentsService.handlePayment(paymentDto);
  }

  @Get('price/:numberOfSchedules')
  async getPrice(
    @Param('numberOfSchedules') numberOfSchedules: number,
  ): Promise<number> {
    return this.paymentsService.getPrice(numberOfSchedules);
  }
}
