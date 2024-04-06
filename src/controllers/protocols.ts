export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<N> {
  headers?: any;
  params?: any;
  body?: N;
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}