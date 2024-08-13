import { TypeTitle } from "../types/Constant";
import { ErrorMessages } from "../types/validator/Message";

export const validateTypeFormat = (type: string): void => {
  if (!type || typeof type !== "string") {
    throw Error(ErrorMessages.InvalidTypeFormat);
  }

  if (!Object.values(TypeTitle).includes(type as TypeTitle)) {
    throw Error(ErrorMessages.TypeDoesntExists);
  }
};
