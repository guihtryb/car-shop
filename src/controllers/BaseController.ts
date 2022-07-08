import { Request, Response } from 'express';

import
Controller,
{
  RequestWithBody,
  ResponseError,
} from '../interfaces/ControllerInterface';

import BaseService from '../services/BaseService';

enum ControllerErros {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Object not found',
  BAD_REQUEST = 'Invalid Data Format',
}

export default abstract class BaseController<T> implements Controller<T> {
  abstract route: string;

  protected errors = ControllerErros;

  constructor(protected service: BaseService<T>) { }

  abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const items = await this.service.read();

      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json({
        error: this.errors.INTERNAL,
      });
    }
  };

  abstract readOne(
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract update(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}