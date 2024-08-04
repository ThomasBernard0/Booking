import { IsDateString } from 'class-validator';

export class AvailableSlot {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  available: boolean;

  constructor(startDate: Date, endDate: Date, available: boolean) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.available = available;
  }
}
