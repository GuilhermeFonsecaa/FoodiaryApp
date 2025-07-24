import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../db";
import { mealsTable } from "../db/schema";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, ok } from "../utils/https";
import { listMealSchema } from "../schemas/listMealSchema";

export class ListMealsController {
  static async handle({
    userId,
    queryParams,
  }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = listMealSchema.safeParse(queryParams);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const endDate = new Date(data.date);
    endDate.setUTCHours(23, 59, 59, 59);

    const meals = await db.query.mealsTable.findMany({
      columns: {
        id: true,
        foods: true,
        createdAt: true,
        icon: true,
        name: true,
      },
      where: and(
        eq(mealsTable.userId, userId),
        gte(mealsTable.createdAt, data.date), //quando createdAt é maior ou igual a data que o usuário colocou
        lte(mealsTable.createdAt, endDate), //menor ou igual a endDate
        eq(mealsTable.status, 'success')
      ),
    });

    return ok({
      meals,
    });
  }
}
