import * as express from "express";
import * as bodyParser from "body-parser";
import { Logger } from "./logger/logger";
import Routes from "./api/routes/routes";

class App {
  public express: express.Application;
  public logger: Logger;

  // array to hold users
  users: any[];

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.users = [
      { firstName: "fnam1", lastName: "lnam1", userName: "username1" }
    ];
    this.logger = new Logger();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.get("/", (req, res, next) => {
      res.send("Typescript App works!!");
    });

    // user route
    this.express.use("/api", Routes);

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
