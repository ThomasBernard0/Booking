import { IsDateString } from 'class-validator';

export class ScheduleDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  booked: boolean;

  constructor(date: Date, booked: boolean) {
    this.startDate = date;
    this.endDate = date;
    this.booked = booked;
  }
}
