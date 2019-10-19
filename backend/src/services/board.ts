import { IBoard } from "./../interfaces/IBoard";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";

@Service()
export default class BoardService implements ICrudService {
  constructor(private logger: Logger) {}

  public async getById(id: string): Promise<IBoard> {
    return {} as Promise<IBoard>;
  }
  public async create(data: IBoard): Promise<IBoard> {
    return {} as Promise<IBoard>;
  }
  public async update(id: string): Promise<boolean> {
    return true;
  }
  public async delete(id: string): Promise<boolean> {
    return true;
  }
}
