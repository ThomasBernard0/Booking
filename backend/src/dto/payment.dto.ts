import { Appointment } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class PaymentDto {
  price: number;

  @IsEmail()
  email: string;

  appointments: Appointment[];
}
