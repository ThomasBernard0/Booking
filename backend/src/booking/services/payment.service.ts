import { Injectable } from '@nestjs/common';
import { unitPriceInCent } from 'src/utils/constants/price.constants';

@Injectable()
export class PaymentService {
  constructor() {}

  getUnitPriceInCent(): number {
    return unitPriceInCent;
  }

  getPriceInCent(numberOfSchedules: number): number {
    return numberOfSchedules * unitPriceInCent;
  }
}
