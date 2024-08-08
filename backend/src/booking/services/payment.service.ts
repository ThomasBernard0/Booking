import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor() {}

  async verifySuccessfulPayment(payment_id: string): Promise<boolean> {
    return true;
  }

  async verifyCanceledPayment(payment_id: string): Promise<boolean> {
    return true;
  }

  async getPrice(numberOfSchedules: number): Promise<number> {
    return numberOfSchedules * 800;
  }
}
