export interface ICrudService {
  getById(id: string): Promise<{}>;
  create(data: {}): Promise<{}>;
  update(id: string, data: {}): Promise<{}>;
  delete(id: string): Promise<{}>;
}
