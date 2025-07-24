import z from "zod";

export const createMealSchema = z.object({
  fileType: z.enum(["audio/m4a", "image/jpeg"]),
});
