import React from "react";
import { useLocation } from "react-router-dom";

export default function StripeMock() {
  const location = useLocation();
  const { payment_id } = location.state;
  return (
    <div>
      <p>StripeMock</p>
      <p>{payment_id}</p>
    </div>
  );
}
