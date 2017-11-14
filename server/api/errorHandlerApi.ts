import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export function errorHandlerApi(err : ErrorRequestHandler, req : Request, res : Response, next : NextFunction) {
  console.error(`errorRequestHandler - ocorreu um erro ao processar a requisição: ${err}`);

  res.status(500).json({
    errorCode: "ERR-001",
    message: "Erro interno de servidor"
  });
}
