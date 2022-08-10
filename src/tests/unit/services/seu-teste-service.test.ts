import { expect } from 'chai';
import * as sinon from 'sinon';
import { Car, CarSchema } from '../../../interfaces/CarInterface';
import { carMock, idMock } from '../mocks/carModel';
import CarService from '../../../services/CarService';
import { SafeParseError, SafeParseSuccess, ZodError } from 'zod';
import { zodError } from '../mocks/carService';
import { carModel } from '../../../models/CarModel';

describe('Testing Car Service', () => {
  const parseFailed: SafeParseError<Car> = {
    success: false,
    error: zodError as unknown as ZodError,
  };

  const parseSucceed: SafeParseSuccess<Car> = {
    success: true,
    data: carMock,
  };

  beforeEach(sinon.restore);

  describe('Create Car', () => {
    it('On Success', async () => {

      sinon.stub(carModel, 'create').resolves(carMock);
      sinon.stub(CarSchema, 'safeParse').returns(parseSucceed);

      const carService = new CarService();

      const carCreated = await carService.create(carMock)

      expect(carCreated).to.be.deep.equal(carMock);
    });

    it('On Failure', async () => {
      sinon.stub(CarSchema, 'safeParse').returns(parseFailed);

      const carService = new CarService();

      const carCreated = await carService.create(carMock)

      expect(carCreated).to.be.deep.equal({ error: parseFailed.error });
    });
  });

  describe('Read Cars', () => {
    it('On Success', async () => {
      sinon.stub(carModel, 'read').resolves([carMock]);

      const carService = new CarService();

      const cars = await carService.read()

      expect(cars).to.be.deep.equal([carMock]);
    });
  });

  describe('Read one Car', () => {
    it('On Failure by passing an invalid id', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);

      const carService = new CarService();

      const car = await carService.readOne('invalid_id')

      expect(car).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' });
    });

    it('On Failure by passing an not existing id', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);

      const carService = new CarService();

      const carsCreated = await carService.readOne('12ac12ac12ac12ac12ac12ac')

      expect(carsCreated).to.be.deep.equal(null);
    });

    it('On Success', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMock);

      const carService = new CarService();

      const carsCreated = await carService.readOne(idMock);

      expect(carsCreated).to.be.deep.equal(carMock);
    });
  });

  describe('Update Car', () => {
    it('On Failure by passing an invalid id', async () => {
      const carService = new CarService();

      const carUpdated = await carService.update('invalid_id', carMock)

      expect(carUpdated).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' });
    });

    it('On Failure by passing a not existing id', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);

      const carService = new CarService();

      const carUpdated = await carService.update('12ac12ac12ac12ac12ac12ac', carMock)

      expect(carUpdated).to.be.equal(null);
    });

    it('On Success', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMock);
      sinon.stub(CarSchema, 'safeParse').returns(parseSucceed);
      sinon.stub(carModel, 'update').resolves(carMock);

      const carService = new CarService();

      const carUpdated = await carService.update(idMock, carMock)

      expect(carUpdated).to.be.deep.equal(carMock);
    });
  });
  describe('Delete Car', () => {
    it('On Failure by passing an invalid id', async () => {
      const carService = new CarService();

      const carDeleted = await carService.delete('invalid_id')

      expect(carDeleted).to.be.deep.equal({ error: 'Id must have 24 hexadecimal characters' });
    });

    it('On Failure by passing a not existing id', async () => {
      sinon.stub(carModel, 'readOne').resolves(null);

      const carService = new CarService();

      const carDeleted = await carService.delete('12ac12ac12ac12ac12ac12ac')

      expect(carDeleted).to.be.equal(null);
    });

    it('On Success', async () => {
      sinon.stub(carModel, 'readOne').resolves(carMock);
      sinon.stub(CarSchema, 'safeParse').returns(parseSucceed);
      sinon.stub(carModel, 'delete').resolves(carMock);

      const carService = new CarService();

      const carDeleted = await carService.delete(idMock)

      expect(carDeleted).to.be.deep.equal(carMock);
    });
  });
});