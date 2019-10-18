import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  //   app.use("/users", route);

  route.get("/cards", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.get("/card/:cardId", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.post("/card/create", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.post("/card/:cardId/delete", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.post("/card/:cardId/update", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });
};
