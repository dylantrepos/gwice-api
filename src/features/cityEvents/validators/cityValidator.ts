import { checkCityNameExists } from "../../../utils/utils";
import { ErrorMessages } from "../types/validator/Message";

export const validateCity = (cityName: string): void => {
  if (!cityName || typeof cityName !== "string") {
    throw Error(ErrorMessages.CityIsRequired);
  }

  if (!checkCityNameExists(cityName)) {
    throw Error(ErrorMessages.CityNotValid);
  }
};
