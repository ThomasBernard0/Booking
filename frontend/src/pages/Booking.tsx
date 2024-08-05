import React, { useState } from "react";
import Calendar from "./../components/Calendar/Calendar";
import Sidemenu from "./../components/Sidemenu/Sidemenu";
import RecapModal from "./../components/RecapModal/RecapModal";
import { Slot } from "../types/slot";

export default function Appointment() {
  const [slotsSelected, setSlotsSelected] = useState<{
    [key: string]: Slot;
  }>({});
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [openRecapModal, setOpenRecapModal] = useState<boolean>(false);
  return (
    <div className="appointment-wrapper">
      <Calendar setDateSelected={setDateSelected} />
      {dateSelected && (
        <Sidemenu
          dateSelected={dateSelected}
          slotsSelected={slotsSelected}
          setSlotsSelected={setSlotsSelected}
          setOpenRecapModal={setOpenRecapModal}
        />
      )}
      <RecapModal
        openRecapModal={openRecapModal}
        setOpenRecapModal={setOpenRecapModal}
        slotsSelected={slotsSelected}
      />
    </div>
  );
}
