import { HttpRequest, HttpResponse } from "../types/Http";
import { created } from "../utils/https";

export class SignUpController {
  static async handle(request: HttpRequest): Promise<HttpResponse> {
    return created({
      accessToken: "SignUp: token de acesso",
    });
  }
}
