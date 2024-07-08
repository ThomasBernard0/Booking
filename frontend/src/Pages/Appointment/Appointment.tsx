import React, { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import "./Appointment.css";

export default function Appointment() {
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  return (
    <div className="appointment-wrapper">
      <Calendar setDateSelected={setDateSelected} />
      {dateSelected && <Sidemenu dateSelected={dateSelected} />}
    </div>
  );
}
