import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BookingService } from './services/booking.service';
import { AvailabilityService } from './services/availability.service';
import { PaymentService } from './services/payment.service';
import { EmailService } from './services/email.service';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  imports: [PrismaModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    AvailabilityService,
    PaymentService,
    EmailService,
    StripeService,
  ],
})
export class BookingModule {}
