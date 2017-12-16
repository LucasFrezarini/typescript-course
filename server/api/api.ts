import * as express         from 'express';
import { Application }      from 'express';
import * as morgan          from 'morgan';
import * as bodyParser      from 'body-parser';
import Routes               from './routes/routes';
import Handlers             from "./responses/Handlers";
import Auth                 from "../auth";
import { AuthConfigType }   from "../auth";

class Api {

  public express : Application;

  constructor() {
    this.express = express();
    this.middlewares();
  }

  middlewares() : void {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.express.use(Handlers.errorHandlerApi);
    this.express.use(Auth.config().initialize());
    this.routes();
  }

  private routes() : void {
    Routes.initRoutes(this.express, Auth.config());
  }

}

export default new Api().express;
