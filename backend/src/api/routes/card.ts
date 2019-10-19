import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  app.get("/cards", (req: Request, res: Response) => {
    return res.send("Get cards");
  });

  app.get("/card/:cardId", (req: Request, res: Response) => {
    return res.send("Get card");
  });

  app.post("/card/create", (req: Request, res: Response) => {
    return res.send("Create card");
  });

  app.delete("/card/:cardId/delete", (req: Request, res: Response) => {
    return res.send("Delete card");
  });

  app.patch("/card/:cardId/update", (req: Request, res: Response) => {
    return res.send("Update card");
  });
};
