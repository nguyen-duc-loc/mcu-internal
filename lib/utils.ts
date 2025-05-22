import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import numeral from "numeral";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number) =>
  (amount >= 1_000_000
    ? numeral(amount).format("$0,0.00a")
    : numeral(amount).format("$0,0.00")
  ).toUpperCase();
