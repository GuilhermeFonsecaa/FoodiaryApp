import { APIGatewayProxyEventV2 } from "aws-lambda";
import { parseResponse } from "../utils/parseResponse";
import { parseProtectedEvent } from "../utils/parseProtectedEvent";
import { unauthorized } from "../utils/https";
import { CreateMealController } from "../controllers/CreateMealController";

export async function handler(event: APIGatewayProxyEventV2) {
  try {
    const request = parseProtectedEvent(event); //função que se passa o evento e pega os dados da request

    const response = await CreateMealController.handle(request);

    return parseResponse(response);
  } catch {
    return parseResponse(unauthorized({ error: "Invalid access token." }));
  }
}
