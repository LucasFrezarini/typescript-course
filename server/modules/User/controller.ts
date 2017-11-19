import * as HTTPStatus from "http-status";
import * as _ from "lodash";
import { Request, Response } from "express";
import { onSuccess } from "../../api/responses/successHandler";
import { onError } from "../../api/responses/errorHandler";
import { onDbError } from "../../config/dbErrorHandler";
import User from "./service";

class UserController {

  private UserService : User;

  constructor() {
    this.UserService = new User();
  }

  getAll(req: Request, res: Response) {
    this.UserService.getAll()
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, `Não foi possível buscar todos os usuários`));
  }

  createUser(req: Request, res: Response) {
    this.UserService.create(req.body)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onDbError, res))
    .catch(_.partial(onError, res, `Não foi possível criar o usuário`));
  }

  getById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    this.UserService.getById(userId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, `Não foi possível buscar o usuário especificado`));
  }

  updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const props = req.body;

    this.UserService.update(userId, props)
    .then(_.partial(onSuccess, res))
    .catch(_.partial(onError, res, `Não foi possível atualizar o usuário`));
  }

  deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    this.UserService.delete(userId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, `Não foi possível excluir o usuário`));
  }
}

export default UserController;
