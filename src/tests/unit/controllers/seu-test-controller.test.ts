import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarController from '../../../controllers/CarController';
import { carService } from '../../../services/CarService';
import { carMock } from '../mocks/carModel';
import { NextFunction, Request, Response } from 'express';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Car Controller', () => {

  beforeEach(sinon.restore);

  describe('Create car', () => {
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(carService, 'create').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });

    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(carService, 'create').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.create(req, res)

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
  describe('Read cars', () => {
    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(carService, 'read').resolves([carMock]);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMock])).to.be.true;
    });
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;

      sinon.stub(carService, 'read').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.read(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
  });
  describe('Read one car', () => {
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: "2" };

      sinon.stub(carService, 'readOne').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '1' };
      sinon.stub(carService, 'readOne').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.readOne(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
  describe('Update car', () => {
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: "2" };

      sinon.stub(carService, 'update').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '1' };

      sinon.stub(carService, 'update').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.update(req, res)

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
  describe('Delete car', () => {
    it('On Failure', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: "2" };

      sinon.stub(carService, 'delete').rejects(null);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.delete(req, res)

      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: "Internal Server Error" })).to.be.true;
    });
    it('On Success', async () => {
      const req = {} as Request;
      const res = {} as Response;
      req.params = { id: '1' };

      sinon.stub(carService, 'delete').resolves(carMock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      const carController = new CarController();
      await carController.delete(req, res)

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  });
});