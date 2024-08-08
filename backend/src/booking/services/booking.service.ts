import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from './email.service';
import { PaymentService } from './payment.service';
import { AvailabilityService } from './availability.service';
import { BookingRequestDto } from '../dtos/BookingRequest.dto';
import { Booking, BookingRequestStatus } from '@prisma/client';
import { BookingDto } from '../dtos/Booking.dto';
import { formatDateToFrenchLocale, getHours } from 'src/utils/dateUtils';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly availabilityService: AvailabilityService,
    private readonly paymentService: PaymentService,
    private readonly emailService: EmailService,
  ) {}

  public async bookingRequest(bookingRequestDto: BookingRequestDto) {
    const isAvailable = await this.availabilityService.checkAvailability(
      bookingRequestDto.bookings,
    );
    if (!isAvailable) {
      throw new Error('Slots not available');
    }

    const payment_id = await this.paymentService.createStripeCheckoutSession();

    await this.prisma.bookingRequest.create({
      data: {
        payment_id,
        priceInCent: bookingRequestDto.priceInCent,
        email: bookingRequestDto.email,
        status: BookingRequestStatus.PENDING,
        bookings: {
          create: bookingRequestDto.bookings.map((booking: BookingDto) => ({
            startDate: new Date(booking.startDate),
            endDate: new Date(booking.endDate),
          })),
        },
        BookingRequestQueue: {
          create: {
            date: new Date(),
          },
        },
      },
    });

    return payment_id;
  }

  public async makeABooking(payment_id: string) {
    if (!payment_id) {
      throw new Error('Payment not made');
    }

    const payment_successful =
      await this.paymentService.verifySuccessfulPayment(payment_id);
    if (!payment_successful) {
      throw new Error('Payment not successful');
    }

    const bookingRequest = await this.prisma.bookingRequest.update({
      where: {
        payment_id: payment_id,
      },
      data: { status: BookingRequestStatus.DONE },
      include: {
        bookings: true,
      },
    });
    if (!bookingRequest) {
      throw new Error();
    }

    const datesCodesList = this.getCodes(bookingRequest.bookings);
    await this.emailService.sendBookingConfirmation(
      datesCodesList,
      bookingRequest.email,
    );
  }

  public async cancelABooking(payment_id: string) {
    if (!payment_id) {
      throw new Error('Cancel not made');
    }

    const payment_successful =
      await this.paymentService.verifyCanceledPayment(payment_id);
    if (!payment_successful) {
      throw new Error('Payment not canceled');
    }

    const bookingRequest = await this.prisma.bookingRequest.update({
      where: {
        payment_id: payment_id,
      },
      data: { status: BookingRequestStatus.CANCELED },
      include: {
        bookings: true,
      },
    });
    if (!bookingRequest) {
      throw new Error();
    }
  }

  getCodes(bookings: Booking[]): { date: string; code: string }[] {
    const sortedBookings = bookings.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
    const datesCodesList = sortedBookings.map((booking) => {
      let date = formatDateToFrenchLocale(booking.startDate);
      date += '  ';
      date += getHours(booking.startDate);
      date += ' - ';
      date += getHours(booking.endDate);
      let code = this.createCode(booking.startDate);
      return { date, code };
    });
    return datesCodesList;
  }

  createCode(date: Date): string {
    const combinedString = process.env.CODE_HASH + new Date(date).toISOString();
    let hash = 0;
    for (let i = 0; i < combinedString.length; i++) {
      const char = combinedString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    hash = Math.abs(hash);
    let fourDigitCode = (hash % 10000).toString();
    fourDigitCode = fourDigitCode.padStart(4, '0');
    return fourDigitCode;
  }
}
