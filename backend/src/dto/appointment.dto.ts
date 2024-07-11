import { IsDateString, IsEmail } from 'class-validator';

export class AppointmentDto {
  @IsDateString()
  date: Date;

  @IsEmail()
  email: string;
}
