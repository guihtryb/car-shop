import { Response, Request } from 'express';
import { Car } from '../interfaces/CarInterface';
import {
  RequestWithBody,
  ResponseError,
} from '../interfaces/ControllerInterface';
import CarService from '../service/CarService';
import BaseController from './BaseController';

export default class CarController extends BaseController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;

    try {
      const newCar = await this.service.create(body);

      return res.status(this.statusCode.SUCCESFULLY_REQUESTED).json(newCar);
    } catch (error) {
      return res.status(this.statusCode.INTERNAL).json({
        error: this.errors.INTERNAL,
      });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();

      return res.status(this.statusCode.SUCCESFULLY_REQUESTED).json(cars);
    } catch (error) {
      return res.status(this.statusCode.INTERNAL).json({
        error: this.errors.INTERNAL,
      });
    }
  };

  readOne = async (
    req: Request,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);

      if (!car) {
        return res.status(this.statusCode.NOT_FOUND).json({
          error: this.errors.NOT_FOUND,
        });
      }

      return res.status(this.statusCode.SUCCESFULLY_REQUESTED).json(car);
    } catch (error) {
      return res.status(this.statusCode.INTERNAL).json({
        error: this.errors.INTERNAL,
      });
    }
  };

  update = async (
    req: RequestWithBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    const { id } = req.params;
    try {
      const carUpdated = await this.service.update(id, body);

      if (!carUpdated) {
        return res.status(this.statusCode.NOT_FOUND).json({
          error: this.errors.NOT_FOUND,
        });
      }

      return res.status(this.statusCode.SUCCESFULLY_REQUESTED).json(carUpdated);
    } catch (error) {
      return res.status(this.statusCode.INTERNAL).json({ error });
    }
  };

  delete = async (
    req: Request,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const carDeleted = await this.service.delete(id);

      if (!carDeleted) {
        return res.status(this.statusCode.NOT_FOUND).json({
          error: this.errors.NOT_FOUND,
        });
      }

      return res.status(this.statusCode.SUCCESFULLY_REQUESTED).json(carDeleted);
    } catch (error) {
      return res.status(this.statusCode.INTERNAL).json({ error });
    }
  };
}