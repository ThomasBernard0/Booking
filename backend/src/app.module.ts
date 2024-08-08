import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './booking/booking.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [PrismaModule, BookingModule, StripeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
