import { IList } from "./../interfaces/IList";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import List from "./../models/list";

@Service()
export default class ListService implements ICrudService {
  constructor(private logger: Logger) {}

  public async get(): Promise<IList[]> {
    const lists = await List.find();
    return lists;
  }

  public async getById(id: string): Promise<IList> {
    const board = await List.findById(id);
    return board;
  }

  public async create(data: IList): Promise<IList> {
    const board = List.create(data);
    return board;
  }

  public async update(id: string, data: IList): Promise<IList> {
    const board = await List.findByIdAndUpdate(id, data);
    return await board.save();
  }

  public async delete(id: string): Promise<IList> {
    const board = await List.findByIdAndDelete(id);
    return board;
  }
}
