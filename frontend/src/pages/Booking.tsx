import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Calendar from "../components/Calendar";
import Sidemenu from "../components/Sidemenu";
import RecapModal from "../components/RecapModal";
import { Slot } from "../types/slot";
import { Container } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51PlcVmP4q1UMQeFZarQtMVWBneG4BNOro9DOpEgcz7APC6vEjDP3t6Ek1FFhIDcrMD7Larddt1G0TAv86oNkoVmz00XSuX15w3"
);

export default function Appointment() {
  const [slotsSelected, setSlotsSelected] = useState<{
    [key: string]: Slot;
  }>({});
  const [dateSelected, setDateSelected] = useState<Date | null>(null);
  const [openRecapModal, setOpenRecapModal] = useState<boolean>(false);
  const openModal = () => {
    setOpenRecapModal(true);
  };
  const closeModal = () => {
    setOpenRecapModal(false);
  };
  return (
    <Elements stripe={stripePromise}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          minHeight: "100vh",
        }}
      >
        <Calendar setDateSelected={setDateSelected} />
        {dateSelected && (
          <Sidemenu
            dateSelected={dateSelected}
            slotsSelected={slotsSelected}
            setSlotsSelected={setSlotsSelected}
            openModal={openModal}
          />
        )}
      </Container>
      <RecapModal
        openRecapModal={openRecapModal}
        closeModal={closeModal}
        slotsSelected={slotsSelected}
      />
    </Elements>
  );
}
