import { Car, CarSchema } from '../interfaces/CarInterface';
import { ServiceError } from '../interfaces/ServiceInterface';
import CarModel from '../models/CarModel';
import BaseService from './BaseService';

export default class CarService extends BaseService<Car> {
  constructor(
    protected model = new CarModel(),
  ) {
    super(model);
  }

  public async create(carObj: Car): Promise<Car | ServiceError | null> {
    const parsed = CarSchema.safeParse(carObj);

    return parsed.success ? this.model.create(carObj) : { error: parsed.error };
  }

  public async readOne(_id: string): Promise<Car | ServiceError | null> {
    const carSearched = await this.model.readOne(_id);

    if (!carSearched) return null;

    return carSearched;
  }

  public async update(
    _id: string,
    payload: Car,
  ): Promise<Car | ServiceError | null> {
    const carToUpdate = await this.model.readOne(_id);

    if (!carToUpdate) return null;

    const newCarData = CarSchema.safeParse(payload);

    return newCarData.success ? this.model
      .update(_id, payload) : { error: newCarData.error };
  }

  public async delete(_id: string): Promise<Car | ServiceError | null> {
    const carToDelete = await this.model.readOne(_id);

    if (!carToDelete) return null;

    await this.model.delete(_id);

    return carToDelete;
  }
}