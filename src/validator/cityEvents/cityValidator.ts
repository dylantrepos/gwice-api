import { ErrorMessages } from "../../types/validator/Message";
import { IValidator } from "../../types/validator/Validator";
import { checkCityNameExists } from "../../utils/utils";

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
