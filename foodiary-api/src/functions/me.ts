import { APIGatewayProxyEventV2 } from "aws-lambda";
import { parseResponse } from "../utils/parseResponse";
import { MeController } from "../controllers/MeController";
import { parseProtectedEvent } from "../utils/parseProtectedEvent";
import { unauthorized } from "../utils/https";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const request = parseProtectedEvent(event); //função que se passa o evento e pega os dados da request

    const response = await MeController.handle(request);

    return parseResponse(response);
  } catch {
    return parseResponse(unauthorized({ error: "Invalid access token." }));
  }
}
