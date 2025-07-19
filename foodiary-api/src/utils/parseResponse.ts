import { HttpResponse } from "../types/Http";

export function parseResponse({ statusCode, body }: HttpResponse) {
  return {
    statusCode: statusCode,
    body: body ? JSON.stringify(body) : undefined,
  };
}
