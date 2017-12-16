import { Application, Request, Response } from "express";
import UserRoutes from "../../modules/User/routes";
import TokenRoutes from "../../modules/Auth/auth";

class Routes {

  private router : UserRoutes;

  constructor() {
    this.router = new UserRoutes();
  }

  initRoutes(app : Application, auth : any) : void {
    app.route('/api/users/all').all(auth.authenticate()).get(this.router.index);
    app.route('/api/users/:id').all(auth.authenticate()).get(this.router.findOne);
    app.route('/api/users/new').all(auth.authenticate()).post(this.router.create);
    app.route('/api/users/:id/edit').all(auth.authenticate()).put(this.router.update);
    app.route('/api/users/:id').all(auth.authenticate()).delete(this.router.destroy);
    app.route('/token').post(TokenRoutes.auth);
  }
}

export default new Routes();
