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

      if ('error' in newCar) {
        return res.status(400).json({ error: this.errors.BAD_REQUEST });
      }

      return res.status(201).json(newCar);
    } catch (error) {
      return res.status(500).json({
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

      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json({
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

      if (!car) return res.status(404).json({ error: this.errors.NOT_FOUND });

      if ('error' in car) {
        return res.status(400).json({
          error: car.error,
        });
      }

      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({
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
      const car = await this.service.update(id, body);

      if (!car) return res.status(404).json({ error: this.errors.NOT_FOUND });

      if ('error' in car) return res.status(400).json({ error: car.error });
      // wip - avaliar car
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };

  delete = async (
    req: Request,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.delete(id);

      if (!car) return res.status(404).json({ error: this.errors.NOT_FOUND });

      if ('error' in car) {
        return res.status(400).json({
          error: car.error,
        });
      }

      return res.status(204).json(car);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}