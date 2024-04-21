import { checkCityEventIdExists } from "../../../utils/utils";
import { ErrorMessages } from "../types/validator/Message";

export const validateEventId = async (
  eventId: string | undefined
): Promise<void> => {
  if (typeof eventId === "undefined" || eventId === null || eventId === "") {
    throw Error(ErrorMessages.EventIdIsRequired);
  }

  if (isNaN(+eventId) || eventId === "" || Number(eventId) < 0) {
    throw Error(ErrorMessages.InvalidEventIdFormat);
  }

  if (!(await checkCityEventIdExists(+eventId))) {
    throw Error(ErrorMessages.InvalidEventId);
  }
};
