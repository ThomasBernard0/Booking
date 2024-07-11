import { IsDateString } from 'class-validator';

export class ScheduleDto {
  @IsDateString()
  date: Date;

  booked: boolean;

  constructor(date: Date, booked: boolean) {
    this.date = date;
    this.booked = booked;
  }
}
