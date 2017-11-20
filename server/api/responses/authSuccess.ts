import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jwt-simple";
import * as HTTPStatus from "http-status";
const config = require('../../config/env/config')();

export default async function authSuccess(res: Response, credentials: any, data: any) {
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
