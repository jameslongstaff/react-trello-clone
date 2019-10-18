import { Router, Request, Response } from "express";
// import middlewares from "../middlewares";
const route = Router();

export default (app: Router) => {
  //   app.use("/users", route);

  route.get("/user/:userId", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });

  route.post("/user/:userId/update", (req: Request, res: Response) => {
    return res.send("BOARDS");
  });
};
