import { IBoard } from "./../interfaces/IBoard";
import { ICrudService } from "./../interfaces/ICrudService";
import { Logger } from "./../logger/logger";
import { Service, Inject } from "typedi";
import Board from "./../models/board";

@Service()
export default class BoardService implements ICrudService {
  constructor(private logger: Logger) {}

  public async get(queryOptions?: {}): Promise<IBoard[]> {
    const boards = await Board.find(queryOptions).exec();
    return boards;
  }

  public async getById(id: string): Promise<IBoard> {
    const board = await Board.findById(id).exec();
    return board;
  }

  public async create(data: {}): Promise<IBoard> {
    const board = await Board.create(data);
    return board;
  }

  public async update(id: string, data: {}): Promise<IBoard> {
    const board = await Board.findByIdAndUpdate(id, data);
    return await board.save();
  }

  public async delete(id: string): Promise<IBoard> {
    const board = await Board.findByIdAndDelete(id);
    return board;
  }
}
