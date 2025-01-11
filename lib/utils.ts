import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MOTIVATIONAL_PHRASES = [
  "Make Today Count.",
  "Stay Focused.",
  "You’ve Got This!",
  "Turn Your Dreams into Reality.",
  "Progress Over Perfection.",
  "Small Wins Matter.",
  "Keep Moving Forward.",
  "Every Task Counts.",
  "Accomplish Great Things.",
  "Dream Big, Start Small.",
  "Your Goals Are Within Reach.",
];