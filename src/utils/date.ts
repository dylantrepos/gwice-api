import moment from "moment";
import { PERIODS, PeriodDetails } from "../types/Date";

export const Periods: Record<string, PeriodDetails> = {
  [PERIODS.ALWAYS]: {
    start: moment.utc().add(1, 'hour').toDate(),
    end: moment.utc().add(5, 'year').endOf('day').toDate(),
    title: PERIODS.ALWAYS,
  },
  [PERIODS.TODAY]: {
    start: moment.utc().add(1, 'hour').toDate(),
    end: moment.utc().add(1, 'hour').endOf('day').toDate(),
    title: PERIODS.TODAY,
  },
  [PERIODS.TOMORROW]: {
    start: moment.utc().add(1, 'day').startOf('day').toDate(),
    end: moment.utc().add(1, 'day').endOf('day').toDate(),
    title: PERIODS.TOMORROW,
  },
  [PERIODS.WEEKEND]: {
    start: moment.utc().isoWeekday(6).startOf('day').toDate(),
    end: moment.utc().isoWeekday(7).endOf('day').toDate(),
    title: PERIODS.WEEKEND,
  },
  [PERIODS.WEEK]: {
    start: moment.utc().add(1, 'hours').toDate(),
    end: moment.utc().isoWeekday(7).endOf('day').toDate(),
    title: PERIODS.WEEK,
  },
};