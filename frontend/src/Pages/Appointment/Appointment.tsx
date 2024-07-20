import React, { useState } from "react";
import Calendar from "../../Components/Calendar/Calendar";
import Sidemenu from "../../Components/Sidemenu/Sidemenu";
import "./Appointment.css";
import { Schedule } from "../../types/schedule";
import RecapModal from "../../Components/RecapModale/RecapModal";
import SuccessModal from "../../Components/SuccessModal/SuccessModal";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";

export default function Appointment() {
  const [scheduleSelected, setScheduleSelected] = useState<{
    [key: string]: Schedule;
  }>({});
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [openRecapModale, setOpenRecapModale] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  return (
    <div className="appointment-wrapper">
      <Calendar setDateSelected={setDateSelected} />
      {dateSelected && (
        <Sidemenu
          dateSelected={dateSelected}
          scheduleSelected={scheduleSelected}
          setScheduleSelected={setScheduleSelected}
          setOpenRecapModale={setOpenRecapModale}
        />
      )}
      <RecapModale
        openRecapModale={openRecapModale}
        setOpenRecapModale={setOpenRecapModale}
        scheduleSelected={scheduleSelected}
      />
      <SuccessModal
        openSuccessModal={openSuccessModal}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <ErrorModal
        openErrorModal={openErrorModal}
        setOpenErrorModal={setOpenErrorModal}
      />
    </div>
  );
}
