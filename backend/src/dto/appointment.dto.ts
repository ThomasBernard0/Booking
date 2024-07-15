import { IsDateString, IsEmail } from 'class-validator';

export class AppointmentDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
