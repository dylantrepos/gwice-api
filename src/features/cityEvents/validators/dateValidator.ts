import moment from "moment";
import { ErrorMessages } from "../types/validator/Message";

export const validateDateFormat = (from: Date, to: Date): void => {
  const now = new Date();
  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    throw Error(ErrorMessages.InvalidDateFormat);
  }

  if (from < moment().startOf("day").toDate() || to < now) {
    throw Error(ErrorMessages.DateMustBeInTheFuture);
  }

  if (from > to || to < from) {
    throw Error(ErrorMessages.FromDateMustBeLessThanToDate);
  }
};
