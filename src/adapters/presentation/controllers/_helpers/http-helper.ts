import { HttpResponse } from "../_ports/http";

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
});

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
});

export const unprocessableEntity = (error: Error): HttpResponse => ({
  statusCode: 422,
  body: error.message
});

export const serverRequest = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error.message
})

