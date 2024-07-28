export function createDateTimeWithHours(date: string, timeStr: string): Date {
  const dateTime = createDateTime(date);
  const [hours, minutes] = timeStr.split(':').map(Number);
  dateTime.setUTCHours(hours, minutes);
  return dateTime;
}

export function createDateTime(date: string): Date {
  const [day, month, year] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export function formatDateToFrenchLocale(date: Date | null): string {
  if (date == null) return '';
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const frenchDate = dateObj.toLocaleDateString('fr-FR', options);
  return frenchDate.charAt(0).toUpperCase() + frenchDate.slice(1);
}

export function getHours(date: Date | null): string {
  if (!date) return '';
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  const hour = dateObj.getUTCHours().toString();
  const minute = dateObj.getUTCMinutes().toString();
  return `${hour}:${minute.padStart(2, '0')}`;
}
