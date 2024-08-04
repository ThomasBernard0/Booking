export function createDateTimeWithHours(date: Date, timeStr: string): Date {
  const dateTime = createDateUTC(date);
  const [hours, minutes] = timeStr.split(':').map(Number);
  dateTime.setUTCHours(hours, minutes);
  return dateTime;
}

export function createDateUTC(date: Date): Date {
  const localDate = new Date(date);
  const utcDate = new Date(
    Date.UTC(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate(),
      localDate.getUTCHours(),
      localDate.getUTCMinutes(),
      localDate.getUTCSeconds(),
      localDate.getUTCMilliseconds(),
    ),
  );
  return utcDate;
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
