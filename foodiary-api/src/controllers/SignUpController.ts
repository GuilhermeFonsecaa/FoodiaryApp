import { signUpSchema } from "../schemas/signUpSchema";
import { HttpRequest, HttpResponse } from "../types/Http";
import { badRequest, created } from "../utils/https";

export class SignUpController {
  static async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { data, success, error } = signUpSchema.safeParse(body);

    if (!success) {
      return badRequest({ errors: error.issues });
    }

    return created({
      data,
    });
  }
}
