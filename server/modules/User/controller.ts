import * as HTTPStatus from "http-status";
import * as _ from "lodash";
import { Request, Response } from "express";
import Handlers from "../../api/responses/Handlers";
import User from "./service";

class UserController {

  getAll(req: Request, res: Response) {
    User.getAll()
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, `Não foi possível buscar todos os usuários`));
  }

  createUser(req: Request, res: Response) {
    User.create(req.body)
    .then(_.partial(Handlers.onSuccess, res))
    .catch(_.partial(Handlers.onDbError, res))
    .catch(_.partial(Handlers.onError, res, `Não foi possível criar o usuário`));
  }

  getById(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    User.getById(userId)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, `Não foi possível buscar o usuário especificado`));
  }

  updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const props = req.body;

    User.update(userId, props)
    .then(_.partial(Handlers.onSuccess, res))
    .catch(_.partial(Handlers.onError, res, `Não foi possível atualizar o usuário`));
  }

  deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    User.delete(userId)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, `Não foi possível excluir o usuário`));
  }
}

export default new UserController();
