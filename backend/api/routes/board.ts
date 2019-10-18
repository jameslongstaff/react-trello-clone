import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  //   app.use("/users", route);

  route.get("/boards", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.get("/board/:boardId", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.post("/board/:boardId/create", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.post("/board/:boardId/update", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.post("/board/:boardId/delete", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.get("/board/:boardId/cards", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.get("/board/:boardId/lists", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });
};
