import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [PrismaModule, BookingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
