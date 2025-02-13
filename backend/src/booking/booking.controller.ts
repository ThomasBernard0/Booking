import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { AvailableSlot } from './dtos/AvailableSlot.dto';
import { AvailabilityService } from './services/availability.service';
import { PaymentService } from './services/payment.service';
import { BookingRequestDto } from './dtos/BookingRequest.dto';
import { SlotsNotAvailableException } from './errors/SlotsNotAvailableException';

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
    try {
      if (!dateString) {
        throw new BadRequestException('Date parameter is required.');
      }
      return await this.availabilityService.getAvailableSlotsFor(dateString);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve available slots: ${error.message}`,
      );
    }
  }

  @Get('price/:numberOfSchedules')
  async getPrice(
    @Param('numberOfSchedules') numberOfSchedules: number,
  ): Promise<number> {
    try {
      const parsedNumber = Number(numberOfSchedules);
      if (isNaN(parsedNumber) || parsedNumber <= 0) {
        throw new BadRequestException(
          'Number of schedules must be a valid positive number.',
        );
      }
      return this.paymentService.getPriceInCent(parsedNumber);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to retrieve price: ${error.message}`,
      );
    }
  }

  @Post('/bookRequest')
  async bookSlotRequest(
    @Body() bookingRequestDto: BookingRequestDto,
  ): Promise<String> {
    try {
      if (!bookingRequestDto || !bookingRequestDto.bookings?.length) {
        throw new BadRequestException(
          'Invalid booking request: at least one booking is required.',
        );
      }
      return await this.bookingService.bookingRequest(bookingRequestDto);
    } catch (error) {
      if (error instanceof SlotsNotAvailableException) {
        throw new BadRequestException(
          'The selected slots are no longer available.',
        );
      }
      throw new InternalServerErrorException(
        `Failed to process booking request: ${error.message}`,
      );
    }
  }
}
