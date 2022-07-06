import { Service, ServiceError } from '../interfaces/ServiceInterface';
import BaseModel from '../models/BaseModel';

export default abstract class BaseService<T> implements Service<T> {
  constructor(
    protected model: BaseModel<T>,
  ) { }

  public async create(payload: T): Promise<T | ServiceError | null> {
    return this.model.create(payload);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(_id: string): Promise<T | ServiceError | null> {
    return this.model.readOne(_id);
  }

  public async update(
    _id: string,
    payload: T,
  ): Promise<T | ServiceError | null> {
    return this.model.update(_id, payload);
  }

  public async delete(_id: string): Promise<T | ServiceError | null> {
    return this.model.readOne(_id);
  }
}