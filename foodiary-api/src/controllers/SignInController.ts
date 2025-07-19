import { signInSchema } from "../schemas/signInSchema";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, ok } from "../utils/https";

export class SignInController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { data, success, error } = signInSchema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    return ok({
      data,
    });
  }
}
