import { Car, carMongooseModel } from '../interfaces/CarInterface';
import BaseModel from './BaseModel';

export default class CarModel extends BaseModel<Car> {
  constructor(model = carMongooseModel) {
    super(model);
  }
}
