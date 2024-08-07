import React from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  return <div>Success</div>;
}
