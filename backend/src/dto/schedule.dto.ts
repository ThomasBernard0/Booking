import { IsDateString } from 'class-validator';

export class ScheduleDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  booked: boolean;

  constructor(startDate: Date, endDate: Date, booked: boolean) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.booked = booked;
  }
}
