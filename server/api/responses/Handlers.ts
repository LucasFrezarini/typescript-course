import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import * as HTTPStatus from "http-status";
import * as bcrypt from "bcrypt";
import * as jwt from "jwt-simple";
const config = require('../../config/env/config')();

class Handlers {
  authFail(req: Request, res: Response) {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }

  async authSuccess(res: Response, credentials: any, data: any) {
    const isMatch = await bcrypt.compare(credentials.password, data.password);

    if(isMatch) {
      const payload = {id: data.id};
      res.json({
        token: jwt.encode(payload, config.secret)
      })
    } else {
      res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
  }

  onError(res: Response, message: string, err: any, statusCode = HTTPStatus.INTERNAL_SERVER_ERROR) {
    console.error(`Error: ${err}`);
    return res.status(statusCode).send(message);
  }

  onSuccess(res: Response, data: any, statusCode = HTTPStatus.OK) {
    return res.status(statusCode).json({ payload: data});
  }

  errorHandlerApi(err : ErrorRequestHandler, req : Request, res : Response, next : NextFunction) {
    console.error(`errorRequestHandler - ocorreu um erro ao processar a requisição: ${err}`);

    res.status(500).json({
      errorCode: "ERR-001",
      message: "Erro interno de servidor"
    });
  }

  onDbError(res: Response, err: any) {
    console.error(`Erro ao executar ação no banco de dados: ${err}`);
    return res.status(500).json({
      code: "ERR-002",
      message: "Erro interno de servidor"
    })
  }
}

export default new Handlers();
