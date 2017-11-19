import * as HTTPStatus from "http-status";
import { Request, Response} from "express";
import User from "./service";

class UserController {

  private UserService : User;

  constructor() {
    this.UserService = new User();
  }

  getAll(req: Request, res: Response) {
    this.UserService.getAll().then((data) => {
      return res.status(HTTPStatus.OK).json({
        payload: data
      });
    })
  }

  createUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: "OK"
    });
  }

  getById(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: "OK"
    });
  }

  updateUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: "OK"
    });
  }

  deleteUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: "OK"
    });
  }
}

export default UserController;
