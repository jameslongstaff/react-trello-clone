import { ICard } from "./../interfaces/ICard";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import Card from "./../models/card";

@Service()
export default class CardService implements ICrudService {
  constructor(private logger: Logger) { }

  public async get(queryOptions?: {}): Promise<any[]> {
    const cards = Card.find(queryOptions).sort('sortOrder');
    return await cards.exec();
  }

  public async getById(id: string): Promise<any> {
    const board = Card.findById(id);
    return await board.exec();
  }

  public async create(data: [] | {}): Promise<any> {
    const board = await Card.create(data);
    return board;
  }

  public async update(id: string, data: {}): Promise<any> {
    const board = await Card.findByIdAndUpdate(id, data);
    return await board.save();
  }

  public async delete(id: string): Promise<any> {
    const board = await Card.findByIdAndDelete(id);
    return board;
  }
}
