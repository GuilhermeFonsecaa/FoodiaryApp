import { eq } from "drizzle-orm";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { HttpRequest, HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { ok } from "../utils/https";

export class MeController {
  static async handle({ userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        name: true,
        calories: true,
        proteins: true,
        carbohydrates: true,
        fats: true,
      },
      where: eq(usersTable.id, userId),
    });

    return ok({
      user,
    });
  }
}
