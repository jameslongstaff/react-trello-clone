import { ICard } from "./../interfaces/ICard";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import Card from "./../models/card";

@Service()
export default class CardService implements ICrudService {
  constructor(private logger: Logger) {}

  public async get(queryOptions?: {}): Promise<ICard[]> {
    const cards = await Card.find();
    return cards;
  }

  public async getById(id: string): Promise<ICard> {
    const board = await Card.findById(id);
    return board;
  }

  public async create(data: {}): Promise<ICard> {
    const board = Card.create(data);
    return board;
  }

  public async update(id: string, data: {}): Promise<ICard> {
    const board = await Card.findByIdAndUpdate(id, data);
    return await board.save();
  }

  public async delete(id: string): Promise<ICard> {
    const board = await Card.findByIdAndDelete(id);
    return board;
  }
}
