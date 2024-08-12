import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { AvailableSlot } from './dtos/AvailableSlot.dto';
import { AvailabilityService } from './services/availability.service';
import { PaymentService } from './services/payment.service';
import { BookingRequestDto } from './dtos/BookingRequest.dto';

@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly availabilityService: AvailabilityService,
    private readonly paymentService: PaymentService,
  ) {}

  @Get('/availabilities')
  async getAvailableSlotsFor(
    @Query('date') dateString: string,
  ): Promise<AvailableSlot[]> {
    return this.availabilityService.getAvailableSlotsFor(dateString);
  }

  @Get('price/:numberOfSchedules')
  async getPrice(
    @Param('numberOfSchedules') numberOfSchedules: number,
  ): Promise<number> {
    return this.paymentService.getPriceInCent(numberOfSchedules);
  }

  @Post('/bookRequest')
  async bookSlotRequest(
    @Body() bookingRequestDto: BookingRequestDto,
  ): Promise<String> {
    return this.bookingService.bookingRequest(bookingRequestDto);
  }
}
