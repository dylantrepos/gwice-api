import { checkCityEventIdExists } from "../../../utils/utils";
import { ErrorMessages } from "../types/validator/Message";
import { IValidator } from "../types/validator/Validator";

export const validateEventId = async (
  eventId: string | undefined
): Promise<IValidator> => {
  if (typeof eventId === "undefined" || eventId === null || eventId === "") {
    return {
      valid: false,
      error: ErrorMessages.EventIdIsRequired,
    };
  }

  if (isNaN(+eventId) || eventId === "" || Number(eventId) < 0) {
    return {
      valid: false,
      error: ErrorMessages.InvalidEventIdFormat,
    };
  }

  if (!(await checkCityEventIdExists(+eventId))) {
    return {
      valid: false,
      error: ErrorMessages.InvalidEventId,
    };
  }

  return { valid: true };
};
