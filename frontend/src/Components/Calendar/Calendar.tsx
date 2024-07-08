import React, { SetStateAction } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import "./Calendar.css";

export default function Calendar({ setDateSelected }: any) {
  function handleDateSelect(selectInfo: any) {
    let calendarApi = selectInfo.view.calendar;
    setDateSelected(calendarApi.currentData.dateSelection.range.start);
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
      initialView="dayGridMonth"
      locale={frLocale}
      selectable={true}
      select={handleDateSelect}
    />
  );
}
