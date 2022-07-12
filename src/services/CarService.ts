import { Car, CarSchema } from '../interfaces/CarInterface';
import { ServiceError } from '../interfaces/ServiceInterface';
import { carModel } from '../models/CarModel';
import BaseService from './BaseService';

export default class CarService extends BaseService<Car> {
  constructor(
    protected model = carModel,
  ) {
    super(model);
  }

  public async create(carObj: Car): Promise<Car | ServiceError> {
    const parsed = CarSchema.safeParse(carObj);

    return parsed.success ? this.model.create(carObj) : { error: parsed.error };
  }

  public async readOne(_id: string): Promise<Car | ServiceError | null> {
    const isIdCorrect = this.idRegExp.test(_id);

    if (!isIdCorrect) {
      return { error: this.incorrectIdError };
    }

    const carSearched = await this.model.readOne(_id);

    if (!carSearched) return null;

    return carSearched;
  }

  public async update(
    _id: string,
    payload: Car,
  ): Promise<Car | ServiceError | null> {
    const isIdCorrect = this.idRegExp.test(_id);

    if (!isIdCorrect) {
      return { error: this.incorrectIdError };
    }

    const carToUpdate = await this.model.readOne(_id);

    if (!carToUpdate) return null;

    const newCarData = CarSchema.safeParse(payload);

    return !newCarData.success ? { error: newCarData.error }
      : this.model.update(_id, payload);
  }

  public async delete(_id: string): Promise<Car | ServiceError | null> {
    const isIdCorrect = this.idRegExp.test(_id);

    if (!isIdCorrect) return { error: this.incorrectIdError };

    const carToDelete = await this.model.readOne(_id);

    if (!carToDelete) return null;

    return this.model.delete(_id);
  }
}

export const carService = new CarService();
