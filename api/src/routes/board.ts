import { Router, Request, Response } from "express";
import { Container } from "typedi";
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
    const lists = await listService.get({ boardId });
    const cards = await cardService.get({
      listId: { $in: lists.map(l => l._id) }
    });

    const listsWithCards = { ...lists }.map(l => {
      return {
        cards: {
          ...cards.filter(c => c.listId === l._id)
        }
      };
    });

    const response = {
      board: {
        ...board,
        lists: listsWithCards
      }
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
