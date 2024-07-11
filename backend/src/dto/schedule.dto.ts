import { IsDateString, IsEmail } from 'class-validator';

export class AppointmentDto {
  @IsDateString()
  date: Date;

  booked: boolean;
}
