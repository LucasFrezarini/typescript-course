import { Response } from "express";
import * as HTTPStatus from "http-status";

export function onSuccess(res: Response, data: any, statusCode = HTTPStatus.OK) {
  return res.status(statusCode).json({ payload: data});
}
