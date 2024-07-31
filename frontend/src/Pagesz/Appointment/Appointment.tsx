import React, { useState } from "react";
import Calendar from "../../Componentsz/Calendar/Calendar";
import Sidemenu from "../../Componentsz/Sidemenu/Sidemenu";
import "./Appointment.css";
import { Schedule } from "../../types/schedule";
import RecapModal from "../../Componentsz/RecapModal/RecapModal";
import SuccessModal from "../../Componentsz/SuccessModal/SuccessModal";
import ErrorModal from "../../Componentsz/ErrorModal/ErrorModal";

export default function Appointment() {
  const [scheduleSelected, setScheduleSelected] = useState<{
    [key: string]: Schedule;
  }>({});
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [openRecapModal, setOpenRecapModal] = useState<boolean>(false);
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
  const [openErrorModal, setOpenErrorModal] = useState<boolean>(false);
  const [errorType, setErrorType] = useState<string>("");
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
        setOpenSuccessModal={setOpenSuccessModal}
        setOpenErrorModal={setOpenErrorModal}
        dateSelected={dateSelected}
        setDateSelected={setDateSelected}
        setErrorType={setErrorType}
      />
      <SuccessModal
        openSuccessModal={openSuccessModal}
        setOpenSuccessModal={setOpenSuccessModal}
      />
      <ErrorModal
        openErrorModal={openErrorModal}
        setOpenErrorModal={setOpenErrorModal}
        errorType={errorType}
        setErrorType={setErrorType}
      />
    </div>
  );
}
