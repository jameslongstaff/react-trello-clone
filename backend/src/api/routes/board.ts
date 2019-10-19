import { Router, Request, Response } from "express";
import { Container } from "typedi";
import BoardService from "../../services/board";
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
    const board = await boardService
      .getById(req.params.boardId)
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(200).json(board);
  });

  app.post("/board/:boardId/create", async (req: Request, res: Response) => {
    const boardService = Container.get(BoardService);

    const { id, title } = req.params;

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

    const { title } = req.params;

    const board = await boardService
      .update({
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

  app.get("/board/:boardId/cards", (req: Request, res: Response) => {
    return res.send("Get board cards");
  });

  app.get("/board/:boardId/lists", (req: Request, res: Response) => {
    return res.send("get board lists");
  });
};
