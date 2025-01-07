import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Container } from "@mui/material";

type Props = {
  setDateSelected: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function Calendar({ setDateSelected }: Props) {
  return (
    <Container sx={{ padding: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          onChange={(value) => setDateSelected(value)}
          views={["year", "month", "day"]}
          disablePast={true}
          sx={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            maxHeight: "100%",
            "& .MuiPickersSlideTransition-root": {
              minHeight: {
                xs: "260px",
                sm: "500px",
              },
            },
            "& .MuiPickersCalendarHeader-labelContainer": {
              fontSize: {
                xs: "1rem",
                sm: "1.5rem",
              },
            },
            "& .MuiDayCalendar-header": {
              justifyContent: "space-around",
            },
            "& .MuiTypography-root": {
              fontSize: {
                xs: "1rem",
                sm: "1.5rem",
              },
            },
            "& .MuiDayCalendar-weekContainer": {
              justifyContent: "space-around",
            },
            "& .MuiPickersDay-root": {
              width: {
                xs: "40px",
                sm: "80px",
              },
              height: {
                xs: "40px",
                sm: "80px",
              },
              fontSize: {
                xs: "1rem",
                sm: "1.5rem",
              },
            },
          }}
        />
      </LocalizationProvider>
    </Container>
  );
}
