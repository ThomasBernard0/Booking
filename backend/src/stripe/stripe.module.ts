import { forwardRef, Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { BookingModule } from 'src/booking/booking.module';
import { StripeController } from './stripe.controller';

@Module({
  imports: [forwardRef(() => BookingModule)],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
