export interface ICrudService {
  getById(id: string): Promise<{}>;
  create(data: {}): Promise<{}>;
  update(id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
