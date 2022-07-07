import { Router } from 'express';
import BaseController from '../controllers/BaseController';

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoutes(
    controller: BaseController<T>,
    route: string = controller.route,
  ) {
    this.router.post(route, controller.create);
  }
}