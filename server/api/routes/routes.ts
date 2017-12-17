import { Application, Request, Response } from "express";
import UserRoutes from "../../modules/User/routes";
import TokenRoutes from "../../modules/Auth/auth";

class Routes {

  initRoutes(app : Application, auth : any) : void {
    app.route('/api/users/all').all(auth.authenticate()).get(UserRoutes.index);
    app.route('/api/users/:id').all(auth.authenticate()).get(UserRoutes.findOne);
    app.route('/api/users/new').all(auth.authenticate()).post(UserRoutes.create);
    app.route('/api/users/:id/edit').all(auth.authenticate()).put(UserRoutes.update);
    app.route('/api/users/:id').all(auth.authenticate()).delete(UserRoutes.destroy);
    app.route('/token').post(TokenRoutes.auth);
  }
}

export default new Routes();
