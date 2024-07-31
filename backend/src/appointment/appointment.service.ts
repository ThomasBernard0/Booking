import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScheduleDto } from './schedule.dto';
import { createDateTime, createDateTimeWithHours } from 'src/utils/dateUtils';
import getDefaultAvailabilityByDay from 'src/utils/constants/availability.constants';

@Injectable()
export class AppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllSchedules(date: string): Promise<ScheduleDto[]> {
    const appointmentsList = await this.prisma.appointment.findMany();
    const defaultSchedulesList: ScheduleDto[] =
      this.getDefaultSchedulesByDay(date);
    const schedulesList = defaultSchedulesList.map((schedule) => {
      const hasConcurrentPeriod = appointmentsList.some((appointment) => {
        return (
          appointment.startDate < schedule.endDate &&
          appointment.endDate > schedule.startDate
        );
      });
      return {
        ...schedule,
        booked: hasConcurrentPeriod,
      };
    });
    return schedulesList;
  }

  getDefaultSchedulesByDay(date: string): ScheduleDto[] {
    const defaultAvailability: string[][] = getDefaultAvailabilityByDay(
      createDateTime(date).getDay(),
    );
    const defaultSchedule: ScheduleDto[] = defaultAvailability.map(
      (availability) => {
        return new ScheduleDto(
          createDateTimeWithHours(date, availability[0]),
          createDateTimeWithHours(date, availability[1]),
          false,
        );
      },
    );
    return defaultSchedule;
  }
}
