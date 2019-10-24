import { IList } from "./../interfaces/IList";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import List from "./../models/list";

@Service()
export default class ListService implements ICrudService {
  constructor(private logger: Logger) {}

  public async get(queryOptions?: {}): Promise<IList[]> {
    const lists = await List.find(queryOptions).exec();
    return lists;
  }

  public async getById(id: string): Promise<IList> {
    const list = await List.findById(id).exec();
    return list;
  }

  public async create(data: {}): Promise<IList> {
    const list = List.create(data);
    return list;
  }

  public async update(id: string, data: {}): Promise<IList> {
    const list = await List.findByIdAndUpdate(id, data);
    return await list.save();
  }

  public async delete(id: string): Promise<IList> {
    const list = await List.findByIdAndDelete(id);
    return list;
  }
}
