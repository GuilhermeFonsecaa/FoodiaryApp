import { eq } from "drizzle-orm";
import { db } from "../db";
import { signInSchema } from "../schemas/signInSchema";
import { sign } from "jsonwebtoken";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok, unauthorized } from "../utils/https";
import { usersTable } from "../db/schema";
import { compare } from "bcryptjs";

export class SignInController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { data, success, error } = signInSchema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
      },
      where: eq(usersTable.email, data.email),
    });

    if (!user) {
      return unauthorized({ error: "Invalid credentials" });
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
      return unauthorized({ error: "Invalid credentials" });
    }

    const accessToken = sign(
      {
        sub: user.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return ok({
      accessToken,
    });
  }
}
