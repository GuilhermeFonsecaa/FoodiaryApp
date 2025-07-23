import { APIGatewayProxyEventV2 } from "aws-lambda";
import { ProtectedHttpRequest } from "../types/Http";
import { parseEvent } from "./parseEvent";
import { validateAccessToken } from "../lib/jwt";

export function parseProtectedEvent(
  event: APIGatewayProxyEventV2
): ProtectedHttpRequest {
  const baseEvent = parseEvent(event);
  const { authorization } = event.headers;

  if (!authorization) {
    throw new Error("Access token not provided.");
  }

  const [, token] = authorization.split(" "); //faz split em Authorization: Bearer -> (token depois de bearer), pega o token e faz a validação dele

  const userId = validateAccessToken(token);

  if (!userId) {
    throw new Error("Invalid access token");
  }

  return {
    ...baseEvent,
    userId,
  };
}
