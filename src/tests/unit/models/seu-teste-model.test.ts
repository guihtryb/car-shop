import { expect } from 'chai';
// import mongoose from 'mongoose';

import * as sinon from 'sinon';
import CarModel from '../../../models/CarModel';
import { Car, carMongooseModel } from '../../../interfaces/CarInterface';
import { carMock, idMock } from '../mocks/carModel';
import { HydratedDocument } from 'mongoose';

describe('Testing Car Model', () => {

  beforeEach(sinon.restore);

  describe('Create Car', () => {
    it('On Success', async () => {

      sinon.stub(carMongooseModel, 'create').resolves(carMock)

      const carModel = new CarModel();

      const carCreated = await carModel.create(carMock)

      expect(carCreated).to.be.deep.equal(carMock);
    });
  });

  describe('Read Cars', () => {
    it('On Success', async () => {
      sinon.stub(carMongooseModel, 'find').resolves([carMock] as HydratedDocument<Car>[]);

      const carModel = new CarModel();

      const cars = await carModel.read()

      expect(cars).to.be.deep.equal([carMock]);
    });
  });

  describe('Read one Car', () => {
    it('On Failure', async () => {
      sinon.stub(carMongooseModel, 'findOne').resolves(null);

      const carModel = new CarModel();

      const car = await carModel.readOne('invalid_id')

      expect(car).to.be.equal(null);
    });

    it('On Success', async () => {
      sinon.stub(carMongooseModel, 'findOne').resolves(carMock as HydratedDocument<Car>);

      const carModel = new CarModel();

      const carsCreated = await carModel.readOne(idMock)

      expect(carsCreated).to.be.deep.equal(carMock);
    });
  });

  describe('Update Car', () => {
    it('On Failure', async () => {
      sinon.stub(carMongooseModel, 'findOneAndUpdate').resolves(null);

      const carModel = new CarModel();

      const carUpdated = await carModel.update('12ac12ac12ac12ac12ac12ac', carMock)

      expect(carUpdated).to.be.equal(null);
    });

    it('On Success', async () => {
      sinon.stub(carMongooseModel, 'findOneAndUpdate').resolves(carMock as HydratedDocument<Car>);

      const carModel = new CarModel();

      const carsCreated = await carModel.update(idMock, carMock)

      expect(carsCreated).to.be.deep.equal(carMock);
    });
  });
  describe('Delete Car', () => {
    it('On Failure', async () => {
      sinon.stub(carMongooseModel, 'findOneAndDelete').resolves(null);

      const carModel = new CarModel();

      const carDeleted = await carModel.delete('12ac12ac12ac12ac12ac12ac');

      expect(carDeleted).to.be.equal(null);
    });

    it('On Success', async () => {
      sinon.stub(carMongooseModel, 'findOneAndDelete').resolves(carMock as HydratedDocument<Car>);

      const carModel = new CarModel();

      const carsCreated = await carModel.delete(idMock)

      expect(carsCreated).to.be.deep.equal(carMock);
    });
  });
});