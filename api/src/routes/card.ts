import { Router, Request, Response } from "express";
import { Container } from "typedi";
import CardService from "../services/card";
// import middlewares from "../middlewares";

export default (app: Router) => {
  app.get("/cards", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);
    const cards = await cardService.get().catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(cards);
  });

  app.get("/card/:cardId", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);
    const card = await cardService.getById(req.params.cardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(200).json(card);
  });

  app.post("/card/create", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const { title, content, listId } = req.body;

    const card = await cardService
      .create({
        title,
        content,
        listId
      })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(201).json(card);
  });

  app.patch("/card/:cardId/update", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const { cardId } = req.params;
    const { title, content, listId } = req.body;

    const card = await cardService
      .update(cardId, { title, content, listId })
      .catch(error => {
        return res.status(500).json({ error });
      });

    return res.status(200).json(card);
  });

  app.delete("/card/:cardId/delete", async (req: Request, res: Response) => {
    const cardService = Container.get(CardService);

    const { cardId } = req.params;

    const card = await cardService.delete(cardId).catch(error => {
      return res.status(500).json({ error });
    });

    return res.status(204).json(card);
  });
};
