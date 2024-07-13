export function formatDateToDDMMYYYY(date: Date | null): string {
  if (!date) return "";
  let dateObj: Date;
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
}

export function formatDDMMYYYYToDate(dateString: string): Date {
  const [day, month, year] = dateString.split("-");
  const formattedDate = new Date(`${year}-${month}-${day}`);
  return formattedDate;
}
export function formatDateToFrenchLocale(date: Date | null): string {
  if (date == null) return "";
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const frenchDate = date.toLocaleDateString("fr-FR", options);
  return frenchDate.charAt(0).toUpperCase() + frenchDate.slice(1);
}

export function formatDDMMYYYYToFrenchLocale(dateString: string): string {
  const date = formatDDMMYYYYToDate(dateString);
  return formatDateToFrenchLocale(date);
}

export function getHours(date: Date | null): string {
  if (!date) return "";
  let dateObj: Date;
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  const hour = dateObj.getUTCHours().toString();
  const minute = dateObj.getUTCMinutes().toString();
  return `${hour}:${minute.padStart(2, "0")}`;
}
