// template para criação dos testes de cobertura da camada de controller


import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');


chai.use(chaiHttp);

const { expect } = chai;

describe('Sua descrição', () => {

  beforeEach(sinon.restore);

  it('', async () => { });

});