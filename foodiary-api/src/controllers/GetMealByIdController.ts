import { db } from "../db";
import { mealsTable } from "../db/schema";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, ok } from "../utils/https";
import { getMealById } from "../schemas/getMealByIdSchema";
import { and, eq } from "drizzle-orm";

export class GetMealByIdController {
  static async handle({
    params,
    userId,
  }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = getMealById.safeParse(params);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const meal = await db.query.mealsTable.findFirst({
      columns: {
        id: true,
        foods: true,
        createdAt: true,
        icon: true,
        name: true,
        status: true,
      },
      where: and(eq(mealsTable.id, data.mealId), eq(mealsTable.userId, userId)),
    });

    return ok({ meal });
  }
}
