import { model as createModel } from 'mongoose';
import { Car, carMongooseSchema } from '../interfaces/CarInterface';
import BaseModel from './BaseModel';

export default class CarModel extends BaseModel<Car> {
  constructor(model = createModel('Cars', carMongooseSchema)) {
    super(model);
  }
}
