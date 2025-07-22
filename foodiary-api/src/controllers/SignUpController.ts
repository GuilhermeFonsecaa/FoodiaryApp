import { eq } from "drizzle-orm";
import { db } from "../db";
import { sign } from "jsonwebtoken";
import { usersTable } from "../db/schema";
import { signUpSchema } from "../schemas/signUpSchema";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, conflict, ok } from "../utils/https";
import { hash } from "bcryptjs";
import { calculateGoals } from "../lib/calculateGoals";

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

    const goals = calculateGoals({
      activityLevel: rest.activityLevel,
      birthDate: new Date(rest.birthDate),
      gender: rest.gender,
      goal: rest.goal,
      height: rest.height,
      weight: rest.weight,
    });

    const hashedPassword = await hash(account.password, 10);

    const [user] = await db
      .insert(usersTable)
      .values({
        ...account,
        ...rest,
        ...goals,
        password: hashedPassword,
      })
      .returning({
        id: usersTable.id,
      });

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
