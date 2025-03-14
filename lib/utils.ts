import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined | false)[]) {
  return twMerge(clsx(inputs));
}
