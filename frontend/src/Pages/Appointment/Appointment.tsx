import React, { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import "./Appointment.css";

export default function Appointment() {
  const [dateSelected, isDateSelected] = useState<boolean>(true);
  return (
    <div className="appointment-wrapper">
      <Calendar />
      {dateSelected && <Sidemenu />}
    </div>
  );
}
