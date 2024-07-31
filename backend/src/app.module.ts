import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { AppointmentModule } from './appointment/appointment.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PaymentModule,
    AppointmentModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
