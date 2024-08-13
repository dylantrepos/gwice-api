import { ErrorMessages } from "../types/validator/Message";

export const validateSearch = (search: string): void => {
  if (typeof search !== "string" || !isNaN(+search)) {
    throw new Error(ErrorMessages.InvalidSearchFormat);
  }

  if (search.length < 3) {
    throw new Error(ErrorMessages.SearchIsTooShort);
  }

  if (search.length > 50) {
    throw new Error(ErrorMessages.SearchIsTooLong);
  }
};
