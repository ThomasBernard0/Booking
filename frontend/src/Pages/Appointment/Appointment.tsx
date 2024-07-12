import React, { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import "./Appointment.css";
import { Schedule } from "../../types/schedule";

export default function Appointment() {
  const [scheduleSelected, setScheduleSelected] = useState<Set<Schedule>>(
    new Set<Schedule>()
  );
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  return (
    <div className="appointment-wrapper">
      <Calendar setDateSelected={setDateSelected} />
      {dateSelected && (
        <Sidemenu
          dateSelected={dateSelected}
          scheduleSelected={scheduleSelected}
          setScheduleSelected={setScheduleSelected}
        />
      )}
    </div>
  );
}
