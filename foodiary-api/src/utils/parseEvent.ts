import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HttpRequest } from "../types/Http";

export function parseEvent(event: APIGatewayProxyEventV2): HttpRequest {
  const body = JSON.parse(event.body ?? "{}"); //quando receber uma request que não tem body, objeto vazio
  const params = event.pathParameters ?? {};
  const queryParams = event.queryStringParameters ?? {};

  return { body, params, queryParams };
}
