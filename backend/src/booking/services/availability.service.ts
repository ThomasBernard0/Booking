import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Booking, BookingRequestStatus } from '@prisma/client';
import { AvailableSlot } from '../dtos/AvailableSlot.dto';
import { BookingDto } from '../dtos/Booking.dto';
import {
  createDateTimeWithHours,
  formatDDMMYYYYToDate,
} from 'src/utils/dateUtils';
import getDefaultSlotsByDay from 'src/utils/constants/slots.constants';
import { InvalidDateFormatException } from '../errors/InvalidDateFormatException';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  public async checkAvailability(bookingsDto: BookingDto[]): Promise<boolean> {
    for (const booking of bookingsDto) {
      if (!(await this.isAvailable(booking))) {
        return false;
      }
    }
    return true;
  }

  public async getAvailableSlotsFor(
    dateString: string,
  ): Promise<AvailableSlot[]> {
    try {
      const startDate = formatDDMMYYYYToDate(dateString);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      const bookingList = await this.getDoneOrPendingBookingsBetween(
        startDate,
        endDate,
      );
      const defaultAvailableSlotsList: AvailableSlot[] =
        this.getDefaultAvailableSlotsFor(startDate);
      const availableSlotsList = defaultAvailableSlotsList.map(
        (availableSlot) => {
          const hasConcurrentPeriod = bookingList.some((booking) => {
            return (
              booking.startDate < availableSlot.endDate &&
              booking.endDate > availableSlot.startDate
            );
          });
          return {
            ...availableSlot,
            available: !hasConcurrentPeriod,
          };
        },
      );
      return availableSlotsList;
    } catch (error) {
      throw new InvalidDateFormatException(dateString);
    }
  }

  async isAvailable(bookingDto: BookingDto): Promise<boolean> {
    const bookings = await this.getDoneOrPendingBookingsBetween(
      bookingDto.startDate,
      bookingDto.endDate,
    );
    if (bookings.length > 0) return false;
    return true;
  }

  getDoneOrPendingBookingsBetween(
    startDate: Date,
    endDate: Date,
  ): Promise<Booking[]> {
    return this.prisma.booking.findMany({
      where: {
        AND: [
          {
            startDate: {
              lt: endDate,
            },
          },
          {
            endDate: {
              gt: startDate,
            },
          },
          {
            bookingRequest: {
              status: {
                in: [BookingRequestStatus.PENDING, BookingRequestStatus.DONE],
              },
            },
          },
        ],
      },
    });
  }

  getDefaultAvailableSlotsFor(date: Date): AvailableSlot[] {
    const defaultSlots: string[][] = getDefaultSlotsByDay(date.getDay());
    const defaultAvailableSlots: AvailableSlot[] = defaultSlots.map((slot) => {
      return new AvailableSlot(
        createDateTimeWithHours(date, slot[0]),
        createDateTimeWithHours(date, slot[1]),
        true,
      );
    });
    return defaultAvailableSlots;
  }
}
