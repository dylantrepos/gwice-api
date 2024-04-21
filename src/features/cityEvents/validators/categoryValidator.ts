import { CATEGORIES } from "../../../seeder/data/Constant";
import { ErrorMessages } from "../types/validator/Message";

const validCategoryIds = CATEGORIES.map((category) => category.open_agenda_id);

export const validateCategory = (category: string): void => {
  const categoryIdArr = category
    .split(",")
    .filter((item) => item.trim() !== "")
    .map((item) => +item);

  const allIdsAreNumbers = categoryIdArr.every((item) => !isNaN(Number(item)));

  if (!allIdsAreNumbers) {
    throw Error(ErrorMessages.InvalidCategoryIds);
  }

  const allIdsExists = categoryIdArr.every((item) =>
    validCategoryIds.includes(item)
  );

  if (!allIdsExists) {
    throw Error(ErrorMessages.CategoryIdsDoesntExists);
  }
};
