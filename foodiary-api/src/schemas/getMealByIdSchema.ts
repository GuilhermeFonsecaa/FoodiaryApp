import z from "zod";

export const getMealById = z.object({
  mealId: z.uuid(),
});
