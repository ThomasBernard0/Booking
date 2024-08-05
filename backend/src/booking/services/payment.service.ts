import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingRequestStatus } from '@prisma/client';
import { BookingRequestDto } from '../dtos/BookingRequest.dto';
import { BookingDto } from '../dtos/Booking.dto';

@Injectable()
export class PaymentService {
  constructor() {}

  public async createStripeCheckoutSession(): Promise<string> {
    const payment_id = uuidv4();
    return payment_id;
  }

  async verifyPayment(payment_id: string): Promise<boolean> {
    if (Math.floor(Math.random() * 10) <= 1) {
      return false;
    }
    return true;
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
