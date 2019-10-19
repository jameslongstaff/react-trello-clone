import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  //   app.use("/users", route);

  app.get("/boards", (req: Request, res: Response) => {
    return res.send("Get all boards");
  });

  app.get("/board/:boardId", (req: Request, res: Response) => {
    return res.send("Get board by ID");
  });

  app.post("/board/:boardId/create", (req: Request, res: Response) => {
    return res.send("Create new board");
  });

  app.patch("/board/:boardId/update", (req: Request, res: Response) => {
    return res.send("Update existing board");
  });

  app.delete("/board/:boardId/delete", (req: Request, res: Response) => {
    return res.send("Delete existing board");
  });

  app.get("/board/:boardId/cards", (req: Request, res: Response) => {
    return res.send("Get board cards");
  });

  app.get("/board/:boardId/lists", (req: Request, res: Response) => {
    return res.send("get board lists");
  });
};
