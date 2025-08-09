import z from "zod";

export const signinSchema = z.object({
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(8, "Deve conter pelo menos 8 caracteres"),
});

export type signinSchemaType = z.infer<typeof signinSchema>;
