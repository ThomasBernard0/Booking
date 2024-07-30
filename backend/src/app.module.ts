import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentsController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentService } from './services/appointment.service';
import { EmailService } from './services/email.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PaymentsController, AppointmentController],
  providers: [PaymentService, AppointmentService, EmailService],
})
export class AppModule {}
