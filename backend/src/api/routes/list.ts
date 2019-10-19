import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  app.get("/lists/", (req: Request, res: Response) => {
    return res.send("Get lists");
  });

  app.get("/list/:listId/", (req: Request, res: Response) => {
    return res.send("Get list by id");
  });

  app.post("/list/:listId/", (req: Request, res: Response) => {
    return res.send("Create list");
  });

  app.patch("/list/:listId/update", (req: Request, res: Response) => {
    return res.send("Update list");
  });

  app.delete("/list/:listId/update", (req: Request, res: Response) => {
    return res.send("Delete list");
  });

  app.get("/list/:listId/cards", (req: Request, res: Response) => {
    return res.send("Get list cards");
  });
};
