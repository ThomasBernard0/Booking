import { IsEmail } from 'class-validator';
import { BookingDto } from './Booking.dto';

export class BookingRequestDto {
  priceInCent: number;

  @IsEmail()
  email: string;

  bookings: BookingDto[];
}
