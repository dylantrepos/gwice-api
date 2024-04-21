import { ErrorMessages } from "../types/validator/Message";

export const validateSearch = (search: string): void => {
  if (typeof search !== "string" || !isNaN(+search)) {
    throw new Error(ErrorMessages.InvalidSearchFormat);
  }

  if (!/^[a-z0-9]+$/i.test(search)) {
    throw new Error(ErrorMessages.InvalidCharactersInSearch);
  }

  if (search.length < 3) {
    throw new Error(ErrorMessages.SearchIsTooShort);
  }

  if (search.length > 100) {
    throw new Error(ErrorMessages.SearchIsTooLong);
  }
};
