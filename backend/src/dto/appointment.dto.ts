import { IsDateString, IsEmail } from 'class-validator';

export class AppointmentDto {
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsEmail()
  email: string;
}
