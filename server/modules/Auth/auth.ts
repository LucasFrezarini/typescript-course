import { Request, Response } from "express";
import * as _ from "lodash";

import authSuccess from "../../api/responses/authSuccess";
import authFail from "../../api/responses/authFail";
import User from "../User/service";

const userService = new User();

class tokenRoutes {

  auth(req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    }

    if(credentials.hasOwnProperty("email") && credentials.hasOwnProperty("password")) {
      userService.getByEmail(credentials.email)
        .then(_.partial(authSuccess, res, credentials))
        .catch(_.partial(authFail, req, res));
    }

  }
}

export default tokenRoutes;
