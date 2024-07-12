import { useEffect, useState } from "react";

export function useSchedules(date: string, dateSelected: Date | null) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getSchedules();
  }, [dateSelected]);
  async function getSchedules() {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:3000/appointment/schedules-list?date=${date}`
    );
    const data = await response.json();
    setIsLoading(false);
    setData(data);
  }
  return { data, isLoading };
}
