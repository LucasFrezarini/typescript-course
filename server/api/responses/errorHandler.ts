import { Response } from "express";
import * as HTTPStatus from "http-status";

export function onError(res: Response, message: string, err: any, statusCode = HTTPStatus.INTERNAL_SERVER_ERROR) {
  console.error(`Error: ${err}`);
  return res.status(statusCode).send(message);
}
