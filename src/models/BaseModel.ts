import { Model as MongoModel } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';

export default abstract class BaseModel<T> implements Model<T> {
  constructor(
    protected model: MongoModel<T>,
  ) { }

  public create = async (payload: T): Promise<T> => this.model.create(payload);

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (_id: string): Promise<T | null> => this
    .model.findOne({ _id });

  public update = async (
    _id: string,
    payload: T,
  ): Promise<T | null> => {
    const toUpdate = await this.model.findById(_id);

    await toUpdate?.update(payload);

    return toUpdate;
  };

  public delete = async (_id: string): Promise<T | null> => {
    await this.model.deleteOne({ _id });

    return this.model.findById(_id);
  };
}