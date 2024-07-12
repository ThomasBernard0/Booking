export function formatDateToDDMMYYYY(date: Date | null): string {
  if (date == null) return "";
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
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

export function getHours(date: Date): string {
  if (!date) return "";
  let dateObj: Date;
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  if (isNaN(dateObj.getTime())) {
    return "";
  }
  const hour = dateObj.getUTCHours().toString();
  const minute = dateObj.getUTCMinutes().toString();
  return `${hour}:${minute.padStart(2, "0")}`;
}
