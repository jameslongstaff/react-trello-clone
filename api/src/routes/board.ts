import { Router, Request, Response } from "express";
import { Container } from "typedi";
import _ from "lodash";
import BoardService from "../services/board";
import ListService from "../services/list";
import CardService from "../services/card";
// import middlewares from "../middlewares";

export default (app: Router) => {
  app.get("/boards", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);
    const boards = await boardService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(boards);
  });

  app.get("/board/:boardId", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);
    const cardService = Container.get(CardService);
    const listService = Container.get(ListService);

    const { boardId } = req.params;

    const board = await boardService.getById(boardId);
    const list = await listService.get({ boardId });
    const cards = await cardService.get({
      listId: { $in: list.map(l => l._id) }
    });

    const listsWithCards = list.map(list => {
      return {
        ...list.toObject(),
        cards: [...cards].filter(c => {
          return c.listId === list._id.toString();
        })
      };
    });

    const response = {
      ...board.toObject(),
      lists: listsWithCards
    };

    return res.status(200).json(response);
  });

  app.get("/board/:boardId/lists", async (req: Request, res: Response) => {
    const listService = Container.get(ListService);
    const { boardId } = req.params;

    const lists = await listService.get({ boardId }).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(lists);
  });

  app.post(
    "/board/:boardId/list/create",
    async (req: Request, res: Response) => {
      const listService = Container.get(ListService);

      const { boardId } = req.params;
      const { title } = req.body;

      const list = await listService
        .create({
          boardId,
          title
        })
        .catch(error => {
          return res.status(500).json({ error });
        });

      return res.status(201).json(list);
    }
  );

  app.get("/board/:boardId/cards", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);
    const listService = Container.get(ListService);

    const { boardId } = req.params;

    try {
      const lists = await listService.get({ boardId });

      const listIds = lists.map(l => l._id);

      const cards = await cardService.get({ listId: { $in: listIds } });

      return res.status(200).json(cards);
    } catch (error) {
      return res.status(500).json({ error });
    }
  });

  app.post("/board/create", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { title } = req.body;

    const board = await boardService
      .create({
        title
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(201).json(board);
  });

  app.patch("/board/:boardId/update-list-order", async (req: Request, res: Response) => {

    const listService = Container.get(ListService);

    const { boardId } = req.params;

    const {
      sourceId,
      destinationId,
      sourceIndex,
      destinationIndex,
    } = req.body;

    // pull down all lists for board
    const lists = await listService.get({ boardId });

    // // perform reorder
    const [list] = lists.splice(sourceIndex, 1);
    lists.splice(destinationIndex, 0, list)

    const orderedLists = lists.map((l: any, index: number) => {
      return { id: l._id, sortOrder: index + 1 };
    });

    //TODO: Multi update implementation rather than separate queries
    orderedLists.forEach(async (l: any) => {
      await listService.update(l.id, {
        sortOrder: l.sortOrder,
      });
    });

    return res.status(200).json(lists);
  });

  app.patch("/board/:boardId/update", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { boardId } = req.params;
    const { title } = req.body;

    const board = await boardService
      .update(boardId, {
        title
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(200).json(board);
  });

  app.delete("/board/:boardId/delete", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { boardId } = req.params;

    const board = await boardService.delete(boardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(204).json(board);
  });
};
