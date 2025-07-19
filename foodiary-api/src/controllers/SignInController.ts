import { HttpRequest, HttpResponse } from "../types/Http";
import { ok } from "../utils/https";

export class SignInController {
  static async handle(request: HttpRequest): Promise<HttpResponse> {
    return ok({
      accessToken: "Token de Acesso",
    });
  }
}
