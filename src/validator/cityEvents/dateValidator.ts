import moment from "moment";
import { ErrorMessages } from "../../types/validator/Message";
import { IValidator } from "../../types/validator/Validator";

export const validateDateFormat = (from: Date, to: Date): IValidator => {
  const now = new Date();
  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return { valid: false, error: ErrorMessages.InvalidDateFormat };
  }

  if (from < moment().startOf("day").toDate() || to < now) {
    return { valid: false, error: ErrorMessages.DateMustBeInTheFuture };
  }

  if (from > to || to < from) {
    return { valid: false, error: ErrorMessages.FromDateMustBeLessThanToDate };
  }

  return { valid: true };
};
