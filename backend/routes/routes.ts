import * as express from "express";
import * as bodyParser from "body-parser";
import { Logger } from "../logger/logger";

class Routes {
  public express: express.Application;
  public logger: Logger;

  // array to hold users
  users: any[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    // user route
    // this.express.use("/user", User);
  }
}

export default new Routes().express;
