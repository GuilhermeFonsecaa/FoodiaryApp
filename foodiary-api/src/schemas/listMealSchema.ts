import z from "zod";

export const listMealSchema = z.object({
  date: z.iso.date().transform((dateStr) => new Date(dateStr)),
});
