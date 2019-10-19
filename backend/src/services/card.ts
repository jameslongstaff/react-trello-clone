import { ICard } from "./../interfaces/ICard";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";

@Service()
export default class ListService implements ICrudService {
  constructor(private logger: Logger) {}

  public async getById(id: string): Promise<ICard> {
    return {} as Promise<ICard>;
  }
  public async create(data: ICard): Promise<ICard> {
    return {} as Promise<ICard>;
  }
  public async update(id: string): Promise<boolean> {
    return true;
  }
  public async delete(id: string): Promise<boolean> {
    return true;
  }
}
