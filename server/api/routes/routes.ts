import { Application, Request, Response } from "express";
import UserRoutes from "../../modules/User/routes";

class Routes {

  private router : UserRoutes;
  private tokenRoute;
  private auth;

  constructor(app : Application, auth : any) {
    this.router = new UserRoutes();
    this.auth = auth;
    this.getRoutes(app);
  }

  getRoutes(app : Application) : void {
    app.get('/api/users/all', this.router.index);
    app.get('/api/users/:id', this.router.findOne);
    app.post('/api/users/new', this.router.create);
    app.put('/api/users/:id/edit', this.router.update);
    app.delete('/api/users/:id', this.router.destroy);
    app.post('/token', this.tokenRoute.auth);
  }
}

export default Routes;
