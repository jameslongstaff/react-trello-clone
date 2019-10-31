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

  app.post("/list/:listId/clone", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const cardService = Container.get(CardService);

    const { listId } = req.params;

    const list = await listService.getById(listId).catch(error => {
      return res.status(500).json({ error });
    });

    const { boardId, title } = list;

    const cards = await cardService.get({ listId });

    const clonedList = await listService.create({ boardId: list.boardId, title: list.title });

    let clonedCards = [];

    if (cards.length) {
      clonedCards = await cardService.create(cards.map((c: any) => {
        const { title, content, sortOrder } = c;
        return {
          title, content, sortOrder, listId: clonedList.id,
        }
      }));
    }

    const response = {
      ...clonedList.toObject(),
      cards: [...clonedCards].filter(c => {
        return c.listId === list._id.toString();
      })
    };

    return res.status(200).json(response);
  });

  app.patch("/list/:listId/update-order", async (req: Request, res: Response) => {

    // check if same list

    // get cards by list id, sorted by sort order.
    // Map to array of Ids
    // splice at source index
    // splice at destination index

    // perform update with new sort order

    // other list

    // get src cards
    // Map to array of Ids
    // splice at source index frm src cards
    // get dest cards
    // Map to array of Ids
    // splice at destination index dest cards




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
