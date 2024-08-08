import { useEffect, useState } from "react";
import { formatDateToDDMMYYYY } from "./utils/dateUtils";
import { Slot } from "./types/slot";

export function useSlots(dateSelected: Date | null) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [slotsList, setSlotsList] = useState<Slot[]>([]);
  useEffect(() => {
    getSlots();
  }, [dateSelected]);
  async function getSlots() {
    setIsLoading(true);
    const date = formatDateToDDMMYYYY(dateSelected);
    const response = await fetch(
      `http://localhost:3000/bookings/availabilities?date=${date}`
    );
    const data = await response.json();
    setSlotsList(data);
    setIsLoading(false);
  }
  return { slotsList, isLoading };
}

export function usePrice(openRecapModal: boolean, numberOfSchedules: number) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [priceInCent, setPrice] = useState<number>(0);
  useEffect(() => {
    getPrice();
  }, [openRecapModal]);

  async function getPrice() {
    if (!openRecapModal) return { priceInCent, isLoading };
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:3000/bookings/price/${numberOfSchedules}`
    );
    const data = await response.json();
    setPrice(data);
    setIsLoading(false);
  }
  return { priceInCent, isLoading };
}

export async function makeBookingRequest(
  priceInCent: number,
  email: string,
  slotsSelected: { [key: string]: Slot }
) {
  const bookings = Object.values(slotsSelected).map((slot) => {
    return { startDate: slot.startDate, endDate: slot.endDate };
  });
  const response = await fetch(`http://localhost:3000/bookings/bookRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ priceInCent, email, bookings }),
  });
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  const payment_id = await response.text();
  return payment_id;
}

export async function confirmBookings(payment_id: string) {
  const response = await fetch(
    `http://localhost:3000/bookings/bookConfirmation`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payment_id }),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
