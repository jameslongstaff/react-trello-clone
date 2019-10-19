import { Container } from "typedi";
import { Router, Request, Response } from "express";
import ListService from "../../services/list";
import CardService from "../../services/card";
// import middlewares from "../middlewares";

export default (app: Router) => {
  app.get("/lists/", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const lists = await listService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(lists);
  });

  app.get("/list/:listId/", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const list = await listService.getById(req.params.listId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
  });

  app.post("/list/:listId/", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);

    const { title } = req.params;

    const list = await listService
      .create({
        title
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(201).json(list);
  });

  app.patch("/list/:listId/update", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);

    const { title, listId } = req.params;

    const list = await listService.update(listId, { title }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
  });

  app.delete("/list/:listId", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);

    const { boardId } = req.params;

    const list = await listService.delete(boardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(204).json(list);
  });

  app.get("/list/:listId/cards", (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const cardService = Container.get(CardService);

    const { listId } = req.params;

    //

    const list = listService.getById(listId);
  });
};
