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

    const lists = await listService.get();

    const list = await listService.create({ boardId, title, sortOrder: lists.length + 1 }).catch(error => {
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
      const cardsToClone = cards.map((c: any) => {
        const { title, content, sortOrder } = c;
        return {
          title, content, sortOrder, listId: clonedList._id,
        }
      });

      clonedCards = await cardService.create(cardsToClone);
    }

    const response = {
      ...clonedList.toObject(),
      cards: clonedCards
    };

    return res.status(200).json(response);
  });

  app.patch("/cards/update-order", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
    } = req.body;

    const srcCards = await cardService.get({ listId: sourceId });
    const dstCards = await cardService.get({ listId: destinationId });


    let orderedSrcCards;
    let orderedDstCards;

    if (sourceId !== destinationId) {
      const [card] = srcCards.splice(sourceIndex, 1);
      dstCards.splice(destinationIndex, 0, card);
      orderedDstCards = dstCards.map((c: any, index: number) => {
        return { id: c._id, sortOrder: index + 1, listId: destinationId };
      });
    } else {
      const [card] = srcCards.splice(sourceIndex, 1);
      dstCards.splice(destinationIndex, 0, card);
    }

    orderedSrcCards = srcCards.map((c: any, index: number) => {
      return { id: c._id, sortOrder: index + 1 };
    });

    //TODO: More efficient multi update
    if (!!orderedDstCards) {
      orderedDstCards.forEach(async (c: any) => {
        await cardService.update(c.id, {
          sortOrder: c.sortOrder,
          listId: c.listId,
        });
      });
    }

    //TODO: More efficient multi update
    orderedSrcCards.forEach(async (c: any) => {
      await cardService.update(c.id, {
        sortOrder: c.sortOrder,
      });
    });
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
