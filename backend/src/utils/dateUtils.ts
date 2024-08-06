export function formatDDMMYYYYToDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-');
  const formattedDate = new Date(
    Date.UTC(Number(year), Number(month) - 1, Number(day), 0, 0, 0),
  );
  return formattedDate;
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

export function createDateTimeWithHours(date: Date, timeStr: string): Date {
  const dateTime = new Date(date);
  const [hours, minutes] = timeStr.split(':').map(Number);
  dateTime.setUTCHours(hours, minutes);
  return dateTime;
}
