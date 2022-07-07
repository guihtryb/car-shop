import { Request, Response } from 'express';

import
Controller,
{
  RequestWithBody,
  ResponseError,
} from '../interfaces/ControllerInterface';

import BaseService from '../service/BaseService';

enum ControllerErros {
  INTERNAL = 'Internal Server Error',
  NOT_FOUND = 'Item Not Found',
  BAD_REQUEST = 'Invalid Data Format',
}

enum StatusCode {
  SUCCESFULLY_REQUESTED = 200,
  SUCCESFULLY_CREATED,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL = 500,
}

export default abstract class BaseController<T> implements Controller<T> {
  abstract route: string;

  protected errors = ControllerErros;

  protected statusCode = StatusCode;

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

      return res.status(StatusCode.SUCCESFULLY_REQUESTED).json(items);
    } catch (error) {
      return res.status(StatusCode.INTERNAL).json({
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