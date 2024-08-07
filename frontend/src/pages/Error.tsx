import React from "react";
import { useLocation } from "react-router-dom";

export default function Error() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  return <div>Error</div>;
}
