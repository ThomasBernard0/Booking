export function formatDateToDateString(date: Date | null): string {
  if (date == null) return "";
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return day + "-" + month + "-" + year;
}
