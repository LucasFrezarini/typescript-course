import * as express         from 'express';
import { Application }      from 'express';
import * as morgan          from 'morgan';
import * as bodyParser      from 'body-parser';
import Routes               from './routes/routes';
import { errorHandlerApi }  from "./errorHandlerApi";
import AuthConfig           from "../auth";
import { AuthConfigType }   from "../auth";

class Api {

  public express : Application;
  public auth    : AuthConfigType;

  constructor() {
    this.express = express();
    this.auth = AuthConfig();
    this.middlewares();
  }

  middlewares() : void {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.urlencoded({extended: true}));
    this.express.use(bodyParser.json());
    this.express.use(errorHandlerApi);
    this.express.use(this.auth.initialize());
    this.routes();
  }

  private routes() : void {
    new Routes(this.express, this.auth);
  }

}

export default new Api().express;
