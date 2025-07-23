export type HttpRequest = {
  body: Record<string, any>;
  queryParams: Record<string, any>;
  params: Record<string, any>;
};

export type ProtectedHttpRequest = HttpRequest & {
  userId: string;
};

export type HttpResponse = {
  statusCode: number;
  body?: Record<string, any>;
};
