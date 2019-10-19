import { Router, Request, Response } from "express";

import board from "./routes/board";
import user from "./routes/user";
import card from "./routes/card";
import list from "./routes/list";

// guaranteed to get dependencies
export default () => {
  const app = Router();

  app.get("/", (req: Request, res: Response) => {
    return res.send("Welcome to the API.");
  });

  board(app);
  user(app);
  card(app);
  list(app);

  return app;
};
