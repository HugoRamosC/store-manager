const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');
const dataMocks = require('../../../__tests__/_dataMock');

chai.use(sinonChai);
const { expect } = chai;

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

describe('Products Controller Tests', function () {
  describe('List all product', function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return status 200 and all products', async function () {
      sinon.stub(productsService, 'getAll')
        .resolves(dataMocks.allProductsResponse);

      await productsController.getAll(req, res);

      expect(res.status).calledWith(HTTP_OK_STATUS);
      expect(res.json).calledWithExactly(dataMocks.allProductsResponse);
    });
  });

  describe('List product by ID', function () {
    const req = {};
    const res = {};
    const next = sinon.spy();
    const notFoundObjMock = {
      error: {
        status: 'PRODUCT_NOT_FOUND', message: 'Product not found',
      }
    };
    
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return status 404 and "NOT FOUND" message', async function () {
      req.params = { id: 26091989 };
      
      sinon.stub(productsService, 'getById')
        .resolves(notFoundObjMock);

      await productsController.getById(req, res, next);

      expect(next).calledWith(notFoundObjMock.error);
    });

    it('Should return status 200 and one product', async function () {
      req.params = { id: 1 };

      sinon.stub(productsService, 'getById')
        .resolves(dataMocks.allProductsResponse[0]);

      await productsController.getById(req, res, next);

      expect(res.status).calledWith(HTTP_OK_STATUS);
      expect(res.json).calledWithExactly(dataMocks.allProductsResponse[0]);
    });
  });
})
