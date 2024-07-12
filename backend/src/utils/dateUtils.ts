export function createDateTimeWithHours(date: string, timeStr: string): Date {
  const dateTime = createDateTime(date);
  const [hours, minutes] = timeStr.split(':').map(Number);
  dateTime.setHours(hours, minutes);
  return dateTime;
}

export function createDateTime(date: string): Date {
  const [day, month, year] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
}
