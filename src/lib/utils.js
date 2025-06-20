import { clsx} from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getLastObjectByKey(obj) {
  if (!obj || Object.keys(obj).length === 0) {
    return null; // Handle empty or null object
  }

  const keys = Object.keys(obj);
  keys.sort(); // Sorts keys lexicographically (Firebase push keys are designed for this)

  const lastKey = keys[keys.length - 1];
  return obj[lastKey];
}