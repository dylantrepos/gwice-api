import { citiesList } from "./citiesList";

// Helper function to form time ranges
export const getTimeRange = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const cityDoesNotExist = (city: string) => {
  return !citiesList.includes(city.toLowerCase());
}

export const getFormatedDate = (date: Date) => `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}`