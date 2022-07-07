import App from './app';
import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/CustomRouter';

const server = new App();

const carsController = new CarController();
const carsRouter = new CustomRouter<Car>();

carsRouter.addRoutes(carsController);

server.addRouter(carsRouter.router);

export default server;
