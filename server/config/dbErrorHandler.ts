import { Response } from "express";
import * as HTTPStatus from "http-status";

export function onDbError(res: Response, err: any) {
  console.error(`Erro ao executar ação no banco de dados: ${err}`);
  return res.status(500).json({
    code: "ERR-002",
    message: "Erro interno de servidor"
  })
}
