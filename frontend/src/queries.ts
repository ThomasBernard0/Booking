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
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://localhost:3000/appointments/schedules?date=${date}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setSchedulesList(data);
    setIsLoading(false);
  }
  return { schedulesList, isLoading };
}

export function usePrice(openRecapModal: boolean, numberOfSchedules: number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [price, setPrice] = useState<number>(0);
  useEffect(() => {
    getPrice();
  }, [openRecapModal]);

  async function getPrice() {
    if (!openRecapModal) return { price, isLoading };
    setIsLoading(true);
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `http://localhost:3000/payments/price/${numberOfSchedules}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setPrice(data);
    setIsLoading(false);
  }
  return { price, isLoading };
}

export async function createPayment(
  price: number,
  email: string,
  scheduleSelected: { [key: string]: Schedule }
) {
  const appointments = Object.values(scheduleSelected).map((schedule) => {
    return { startDate: schedule.startDate, endDate: schedule.endDate };
  });
  const token = localStorage.getItem("access_token");
  const response = await fetch(`http://localhost:3000/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price, email, appointments }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
