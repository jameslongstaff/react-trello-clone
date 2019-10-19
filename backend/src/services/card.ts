import { ICard } from "./../interfaces/ICard";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import Card from "./../models/card";

@Service()
export default class ListService implements ICrudService {
  constructor(private logger: Logger) {}

  public async getById(id: string): Promise<ICard> {
    const board = await Card.findById(id);
    return board;
  }

  public async create(data: ICard): Promise<ICard> {
    const board = Card.create(data);
    return board;
  }

  public async update(data: ICard): Promise<ICard> {
    const board = await Card.findById(data.id);
    return await board.save();
  }

  public async delete(id: string): Promise<ICard> {
    const board = await Card.findByIdAndDelete(id);
    return board;
  }
}
