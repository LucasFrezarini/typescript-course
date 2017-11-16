import { Request, Response } from 'express';
import UserController from './controller';

let controller;

class UserRoutes {

  constructor() {
    controller = new UserController();
  }

  index(req: Request, res: Response) {
    return controller.getAll(req, res);
  }
  create(req: Request, res: Response) {
    return controller.createUser(req, res);
  }
  update(req: Request, res: Response) {
    return controller.updateUser(req, res);
  }
  findOne(req: Request, res: Response) {
    return controller.getById(req, res);
  }
  destroy(req: Request, res: Response) {
    return controller.deleteUser(req, res);
  }
}

export default UserRoutes;
