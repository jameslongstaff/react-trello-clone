import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  //   app.use("/users", route);

  route.get("/lists/", (req: Request, res: Response) => {
    return res.send("Lists");
  });

  route.get("/list/:listId/", (req: Request, res: Response) => {
    return res.send("Lists");
  });

  route.get("/list/:listId/", (req: Request, res: Response) => {
    return res.send("Lists");
  });

  route.get("/list/:listId/cards", (req: Request, res: Response) => {
    return res.send("Lists");
  });
};
