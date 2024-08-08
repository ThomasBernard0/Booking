import { Button } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function StripeMock() {
  const location = useLocation();
  const { payment_id } = location.state;
  const navigate = useNavigate();
  const functionBuy = () => {
    if (Math.floor(Math.random() * 10) <= 8) {
      navigate(`/success?session_id=${payment_id}`);
    } else {
      navigate(`/error?session_id=${payment_id}`);
    }
  };
  return (
    <div>
      <p>StripeMock</p>
      <Button onClick={functionBuy}>Payer</Button>
    </div>
  );
}
