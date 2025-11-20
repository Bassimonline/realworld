export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};


const SALE_END_DATE = new Date('2025-09-12T23:59:59Z');

export const calculateTimeLeft = (): TimeLeft => {
  const now = new Date();
  const difference = SALE_END_DATE.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};
