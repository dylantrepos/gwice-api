import { checkCityNameExists } from "../../../utils/utils";
import { ErrorMessages } from "../types/validator/Message";
import { IValidator } from "../types/validator/Validator";

export const validateCity = (cityName: string): IValidator => {
  if (!cityName || typeof cityName !== "string") {
    return {
      valid: false,
      error: ErrorMessages.CityIsRequired,
    };
  }

  if (!checkCityNameExists(cityName)) {
    return {
      valid: false,
      error: ErrorMessages.CityNotValid,
    };
  }

  return { valid: true };
};
