import { Container } from "typedi";
import { Router, Request, Response } from "express";
import ListService from "../services/list";
import CardService from "../services/card";

// import middlewares from "../middlewares";

export default (app: Router) => {
  app.get("/lists/", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const lists = await listService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(lists);
  });

  app.post("/list/create", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);

    const { boardId, title } = req.body;

    const list = await listService.create({ boardId, title }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
  });

  app.get("/list/:listId/", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const list = await listService.getById(req.params.listId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
  });

  app.patch("/list/:listId/update", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);

    const { listId } = req.params;
    const { title } = req.body;

    const list = await listService.update(listId, { title }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(list);
  });

  app.patch("/list/:listId/copy", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const cardService = Container.get(CardService);

    const { listId } = req.body;

    const list = await listService.getById(listId);

    const { boardId, title } = list;

    const cards = (await cardService.get({ listId }));

    const listCopy = await listService.create({ boardId, title }).catch(error => {
      return res.status(500).json({ error });
    });

    const card = await cardService.create(
      cards.map(c => {
        const { title, sortOrder, content } = c;
        return { title, listId: listCopy.id, sortOrder, content }
      })
    );
    return res.status(200).json(list);
  });

  app.patch("/list/:listId/update-order", async (req: Request, res: Response) => {
    // const listService = Container.get(ListService);

    // const { listId } = req.params;

    // const {
    //   sourceId,
    //   destinationId,
    //   sourceIndex,
    //   destinationIndex,
    // } = req.body;

    // // const list = await listService.update(listId, { title }).catch(error => {
    // //   return res.status(500).json({ error });
    // // });

    // return res.status(200).json(list);
  });

  app.delete("/list/:listId", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);

    const { listId } = req.params;

    const list = await listService.delete(listId).catch(error => {
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
