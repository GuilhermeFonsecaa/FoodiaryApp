import { APIGatewayProxyEventV2 } from "aws-lambda";
import { SignInController } from "../controllers/SignInController";
import { parseEvent } from "../utils/parseEvent";
import { parseResponse } from "../utils/parseResponse";

export async function handler(event: APIGatewayProxyEventV2) {
  const request = parseEvent(event); //função que se passa o evento e pega os dados da request

  const response  = await SignInController.handle(request);

  return parseResponse(response);
}
