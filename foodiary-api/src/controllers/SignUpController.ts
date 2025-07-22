import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { signUpSchema } from "../schemas/signUpSchema";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, created } from "../utils/https";
import { hash } from "bcryptjs";

export class SignUpController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { data, success, error } = signUpSchema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const userAlreadyExists = await db.query.usersTable.findFirst({
      columns: {
        email: true,
      },
      where: eq(usersTable.email, data.account.email),
    });

    if (userAlreadyExists) {
      return conflict({ error: "This email is already in use." });
    }

    const { account, ...rest } = data;

    const hashedPassword = await hash(account.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({
        ...account,
        ...rest,
        password: hashedPassword,
        calories: 0,
        carbohydrates: 0,
        fats: 0,
        proteins: 0,
      })
      .returning({
        id: usersTable.id,
      });

    return created({
      userId: user.id,
    });
  }
}
