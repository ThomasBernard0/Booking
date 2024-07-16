import { useEffect, useState } from "react";
import { formatDateToDDMMYYYY } from "./utils/dateUtils";
import { Schedule } from "./types/schedule";

export function useSchedules(dateSelected: Date | null) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [schedulesList, setSchedulesList] = useState<Schedule[]>([]);
  useEffect(() => {
    getSchedules();
  }, [dateSelected]);
  async function getSchedules() {
    setIsLoading(true);
    const date = formatDateToDDMMYYYY(dateSelected);
    const response = await fetch(
      `http://localhost:3000/appointments/schedules?date=${date}`
    );
    const data = await response.json();
    setSchedulesList(data);
    setIsLoading(false);
  }
  return { schedulesList, isLoading };
}

export function usePrice(openRecapModale: boolean, numberOfSchedules: number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    getPrice();
  }, [openRecapModale]);
  async function getPrice() {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:3000/payments/price/${numberOfSchedules}`
    );
    const data = await response.json();
    setPrice(data);
    setIsLoading(false);
  }
  return { price, isLoading };
}

export async function createPayment(
  email: string,
  price: number,
  scheduleSelected: { [key: string]: Schedule }
) {
  const appointment = Object.values(scheduleSelected).map((schedule) => {
    schedule.startDate, schedule.endDate;
  });
  const data = { price, email, appointment };
  const response = await fetch(`http://localhost:3000/payments/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}
