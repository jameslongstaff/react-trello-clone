import { IList } from "./../interfaces/IList";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";

@Service()
export default class ListService implements ICrudService {
  constructor(private logger: Logger) {}

  public async getById(id: string): Promise<IList> {
    return {} as Promise<IList>;
  }
  public async create(data: IList): Promise<IList> {
    return {} as Promise<IList>;
  }
  public async update(id: string): Promise<boolean> {
    return true;
  }
  public async delete(id: string): Promise<boolean> {
    return true;
  }
}
