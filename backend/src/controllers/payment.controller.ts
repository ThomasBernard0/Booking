import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentService } from 'src/services/payment.service';
import { PaymentDto } from 'src/dto/payment.dto';

@Controller('payments')
export class PaymentsController {
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
