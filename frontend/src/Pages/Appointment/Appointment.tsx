import React, { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import "./Appointment.css";

export default function Appointment() {
  const [scheduleSelected, setScheduleSelected] = useState<Set<string>>(
    new Set<string>()
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
