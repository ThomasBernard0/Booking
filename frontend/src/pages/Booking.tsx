import React, { useState } from "react";
import Calendar from "./../components/Calendar/Calendar";
import Sidemenu from "./../components/Sidemenu/Sidemenu";
import "./Appointment.css";
import { Schedule } from "./../types/schedule";
import RecapModal from "./../components/RecapModal/RecapModal";

export default function Appointment() {
  const [scheduleSelected, setScheduleSelected] = useState<{
    [key: string]: Schedule;
  }>({});
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [openRecapModal, setOpenRecapModal] = useState<boolean>(false);
  return (
    <div className="appointment-wrapper">
      <Calendar setDateSelected={setDateSelected} />
      {dateSelected && (
        <Sidemenu
          dateSelected={dateSelected}
          scheduleSelected={scheduleSelected}
          setScheduleSelected={setScheduleSelected}
          setOpenRecapModal={setOpenRecapModal}
        />
      )}
      <RecapModal
        openRecapModal={openRecapModal}
        setOpenRecapModal={setOpenRecapModal}
        scheduleSelected={scheduleSelected}
        setScheduleSelected={setScheduleSelected}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
      />
    </div>
  );
}
