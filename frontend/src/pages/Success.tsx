import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { confirmBookings } from "../queries";

export default function Success() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionIdValue = queryParams.get("session_id");
    if (sessionIdValue) {
      setSessionId(sessionIdValue);
    }
  }, [location.search]);
  useEffect(() => {
    if (sessionId) {
      confirmBookings(sessionId);
    }
  }, [sessionId]);

  return <div>Success</div>;
}
