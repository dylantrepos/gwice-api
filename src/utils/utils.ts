import { WhenQuery } from "../types/CulturalEvents";
import { citiesList } from "./citiesList";

// Helper function to form time ranges
export const getTimeRange = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export const cityDoesNotExist = (city: string) => {
  return !citiesList.includes(city.toLowerCase());
}

export const getFormatedDate = (date: Date) => `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}`

export const getExecutionTimeDuration = (executionTime: number) => {
  let timeMessage = '';
  if (executionTime > 60) {
    const minutes = Math.floor(executionTime / 60);
    const seconds = Math.floor(executionTime % 60);
    timeMessage = `${minutes} minutes and ${seconds} seconds`;
  } else {
    timeMessage = `${executionTime.toFixed(2)} seconds`;
  }

  return timeMessage;
}

export const displayLoadingBar = (when: WhenQuery, percentage: number, length: number, executionTime: number) => {
  const totalBars = 10;
  const filledBars = Math.round(percentage / length * totalBars);
  const emptyBars = totalBars - filledBars;

  const filledBarsString = '#'.repeat(filledBars);
  const emptyBarsString = '-'.repeat(emptyBars);

  // console.clear();
  console.log(`[getEventDetails][${when}] [${filledBarsString}${emptyBarsString}] ${Math.round((percentage / length) * 100)}% // Execution time: ${getExecutionTimeDuration(executionTime)}`);
}

export const timeQueries: WhenQuery[] = ['today', 'weekend', 'week', 'month', 'default'];