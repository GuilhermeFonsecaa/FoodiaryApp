import z from "zod";

export const signupSchema = z.object({
  goal: z.enum(["lose", "maintain", "gain"]),
});

export type signupSchemaType = z.infer<typeof signupSchema>;
