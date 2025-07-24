import { db } from "../db";
import { mealsTable } from "../db/schema";
import { HttpResponse, ProtectedHttpRequest } from "../types/Http";
import { badRequest, created, ok } from "../utils/https";
import { createMealSchema } from "../schemas/createMealSchema";

export class CreateMealController {
  static async handle({
    body,
    userId,
  }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, error, data } = createMealSchema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    const [meal] = await db
      .insert(mealsTable)
      .values({
        userId,
        inputFileKey: "input_file_key",
        inputType: data?.fileType === "audio/m4a" ? "audio" : "picture",
        status: "uploading",
        icon: "",
        name: "",
        foods: [],
      })
      .returning({ id: mealsTable.id });

    return created({ mealId: meal.id });
  }
}
