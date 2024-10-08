import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

type Props = {
  setDateSelected: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function Calendar({ setDateSelected }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar onChange={(value) => setDateSelected(value)} />
    </LocalizationProvider>
  );
}
