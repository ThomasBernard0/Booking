import { useEffect, useState } from "react";
import { formatDateToDDMMYYYY } from "./utils/dateUtils";
import { Schedule } from "./types/schedule";

export function useSchedules(dateSelected: Date | null) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Schedule[]>([]);
  useEffect(() => {
    getSchedules();
  }, [dateSelected]);
  async function getSchedules() {
    setIsLoading(true);
    const date = formatDateToDDMMYYYY(dateSelected);
    const response = await fetch(
      `http://localhost:3000/appointment/schedules-list?date=${date}`
    );
    const data = await response.json();
    setIsLoading(false);
    setData(data);
  }
  return { data, isLoading };
}
