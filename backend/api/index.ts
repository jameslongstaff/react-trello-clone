import { Router } from "express";

import board from "./routes/board";
import user from "./routes/user";
import card from "./routes/card";
import list from "./routes/list";

// guaranteed to get dependencies
export default () => {
  const app = Router();

  board(app);
  user(app);
  card(app);
  list(app);

  return app;
};
