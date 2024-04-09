import { CATEGORIES } from "../../seeder/data/Constant";
import { ErrorMessages } from "../../types/validator/Message";
import { IValidator } from "../../types/validator/Validator";

const validCategoryIds = CATEGORIES.map((category) => category.open_agenda_id);

export const validateCategory = (category: string): IValidator => {
  const categoryIdArr = category
    .split(",")
    .filter((item) => item.trim() !== "")
    .map((item) => +item);

  const allAreNumbers = categoryIdArr.every((item) => !isNaN(Number(item)));

  if (!allAreNumbers) {
    return { valid: false, error: ErrorMessages.InvalidCategoryIds };
  }

  const allAreValid = categoryIdArr.every((item) =>
    validCategoryIds.includes(item)
  );

  if (!allAreValid) {
    return { valid: false, error: ErrorMessages.CategoryIdsDoesntExists };
  }

  return { valid: true };
};
