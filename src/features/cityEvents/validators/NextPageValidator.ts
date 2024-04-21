import { ErrorMessages } from "../types/validator/Message";

export const validateNextPage = (page: string): void => {
  if (isNaN(+page) || page === "" || Number(page) < 0) {
    throw Error(ErrorMessages.InvalidNextPageFormat);
  }
};
