import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PaymentsController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { AppointmentController } from './controllers/appointment.controller';
import { AppointmentService } from './services/appointment.service';

@Module({
  imports: [PrismaModule],
  controllers: [PaymentsController, AppointmentController],
  providers: [PaymentService, AppointmentService],
})
export class AppModule {}
