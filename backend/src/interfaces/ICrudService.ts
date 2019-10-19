export interface ICrudService {
  getById(id: string): Promise<{}>;
  create(data: {}): Promise<{}>;
  update(id: {}): Promise<{}>;
  delete(id: string): Promise<{}>;
}
