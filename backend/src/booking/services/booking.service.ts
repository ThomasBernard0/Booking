import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from './email.service';
import { PaymentService } from './payment.service';
import { AvailabilityService } from './availability.service';
import { StripeService } from 'src/stripe/stripe.service';
import { BookingRequestDto } from '../dtos/BookingRequest.dto';
import { Booking, BookingRequestStatus } from '@prisma/client';
import { BookingDto } from '../dtos/Booking.dto';
import { formatDateToFrenchLocale, getHours } from 'src/utils/dateUtils';

@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly availabilityService: AvailabilityService,
    private readonly emailService: EmailService,
    private readonly paymentService: PaymentService,
    @Inject(forwardRef(() => StripeService))
    private readonly stripeService: StripeService,
  ) {}

  public async bookingRequest(bookingRequestDto: BookingRequestDto) {
    const isAvailable = await this.availabilityService.checkAvailability(
      bookingRequestDto.bookings,
    );
    if (!isAvailable) {
      throw new Error('Slots not available');
    }

    const payment_id = await this.stripeService.createCheckoutSession(
      this.paymentService.getUnitPriceInCent(),
      bookingRequestDto.bookings.length,
      'http://localhost:5173/success',
      'http://localhost:5173/error',
    );

    await this.prisma.bookingRequest.create({
      data: {
        payment_id,
        priceInCent: this.paymentService.getPriceInCent(
          bookingRequestDto.bookings.length,
        ),
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

    const bookingRequest = await this.updateBookingRequestStatusWherePaymentId(
      payment_id,
      BookingRequestStatus.DONE,
    );

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

    await this.updateBookingRequestStatusWherePaymentId(
      payment_id,
      BookingRequestStatus.CANCELED,
    );
  }

  async updateBookingRequestStatusWherePaymentId(
    payment_id: string,
    status: BookingRequestStatus,
  ) {
    return await this.prisma.bookingRequest.update({
      where: {
        payment_id: payment_id,
      },
      data: { status: status },
      include: {
        bookings: true,
      },
    });
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
