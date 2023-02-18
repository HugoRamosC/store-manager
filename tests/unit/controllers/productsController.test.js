const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const productsController = require('../../../src/controllers/productsController');
const productsService = require('../../../src/services/productsService');
const dataMocks = require('../../../__tests__/_dataMock');

chai.use(sinonChai);
const { expect } = chai;

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_DELETED_STATUS = 204;
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
    const next = (params) => params;
    const notFoundObjMock = {
      status: 'PRODUCT_NOT_FOUND', message: 'Product not found',
    };

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return status 404 and "NOT FOUND" message', async function () {
      req.params = { id: 26091989 };
      const response = { "message": "Product not found" }

      sinon.stub(productsService, 'getById')
        .resolves(response);

      await productsController.getById(req, res, next);

      expect(res.json).calledWith(response);
    });

    it('Should return status 200 and requisited product', async function () {
      sinon.stub(productsService, 'getById')
        .resolves(dataMocks.allProductsResponse[0]);

      await productsController.getById(req, res, next);

      expect(res.status).calledWith(HTTP_OK_STATUS);
      expect(res.json).calledWithExactly(dataMocks.allProductsResponse[0]);
    });
  });

  describe('Create/register new product', function () {
    const req = {};
    const res = {};
    const next = sinon.spy();

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return status 201 and product object registred', async function () {
      req.body = { name: 'Produto1' };

      sinon.stub(productsService, 'createProduct')
        .resolves(dataMocks.productCreateResponse);

      await productsController.createProduct(req, res, next);

      expect(res.status).calledWith(HTTP_CREATED_STATUS);
      expect(res.json).calledWithExactly(dataMocks.productCreateResponse);
    });

    it('Should return status 400 and "name is required" message', async function () {
      req.body = {};
      const response = {"message": "\"name\" is required"}

      sinon.stub(productsService, 'createProduct')
        .resolves(response);

      await productsController.createProduct(req, res, next);

      expect(res.json).calledWith(response);
    });

    it('Should return status 400 and "name to lower" message', async function () {
      req.body = { name: 'hugo' };
      const response = {
        "message": "\"name\" length must be at least 5 characters long"
      }

      sinon.stub(productsService, 'createProduct')
        .resolves(response);

      await productsController.createProduct(req, res, next);

      expect(res.json).calledWith(response);
    });
  });

  describe('Update product', function () {
    const req = {};
    const res = {};
    const next = sinon.spy();

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return status 200 and product object updated', async function () {
      req.body = { name: 'Produto1' };
      req.params = { id: 4 };

      sinon.stub(productsService, 'updateProduct')
        .resolves(dataMocks.productCreateResponse);

      await productsController.updateProduct(req, res, next);

      expect(res.status).calledWith(HTTP_OK_STATUS);
      expect(res.json).calledWithExactly(dataMocks.productCreateResponse);
    });

    it('Should return status 404 and "NOT FOUND" message', async function () {
      req.params = { id: 26091989 };
      const response = { "message": "Product not found" }

      sinon.stub(productsService, 'updateProduct')
        .resolves(response);

      await productsController.updateProduct(req, res, next);

      expect(res.json).calledWith(response);
    });
  });

  describe('Delete product', function () {
    const req = {};
    const res = {};
    const next = sinon.spy();

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return only status 204', async function () {
      req.params = { id: 4 };

      sinon.stub(productsService, 'deleteProduct')

      await productsController.deleteProduct(req, res, next);

      expect(res.status).calledWith(HTTP_DELETED_STATUS);
    });

    // it('Should return status 404 and "NOT FOUND" message', async function () {
    //   req.params = { id: 26091989 };
    //   const error = { "status": 400,  "message": "Product not found" }

    //   sinon.stub(productsService, 'deleteProduct')
    //     .throws(error);

    //   await productsController.deleteProduct(req, res, next);

    //   expect(res.json).calledWith({ "message": "Product not found" });
    // });
  });

  describe('Search product', function () {
    const req = {};
    const res = {};
    const next = sinon.spy();

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return all products that matched the paramenter and status 200', async function () {
      req.query = { q: 'martelo' };

      sinon.stub(productsService, 'searchProduct')
        .resolves(dataMocks.productSearchNameResponse);

      await productsController.searchProduct(req, res, next);

      expect(res.status).calledWith(HTTP_OK_STATUS);
      expect(res.json).calledWith(dataMocks.productSearchNameResponse);
    });
  });
})
