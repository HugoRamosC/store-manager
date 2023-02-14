const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');
const dataMocks = require('../../../__tests__/_dataMock');

chai.use(sinonChai);
const { expect } = chai;

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;

describe('Products Service Tests', function () {
  describe('List all product', function () {

    afterEach(() => sinon.restore());

    it('Should return all products', async function () {
      sinon.stub(productsModel, 'getAll')
        .resolves(dataMocks.allProductsResponse);

      const products = await productsService.getAll();

      expect(products).equal(dataMocks.allProductsResponse);
    });
  });

  describe('List product by ID', function () {
    const notFoundObjMock = {
        status: 'PRODUCT_NOT_FOUND', message: 'Product not found',
    };
    
    afterEach(() => sinon.restore());

    it('Should return not found error object with a non-existent id', async function () {
      const productIdNonExistent = 09081989;

      sinon.stub(productsModel, 'getById')
        .resolves(notFoundObjMock);

      const product = await productsService.getById(productIdNonExistent);

      expect(product).equal(notFoundObjMock);
    });

    it('Should return a product with a valid id', async function () {
      const productNonExistentId = 1;

      sinon.stub(productsModel, 'getById')
        .resolves(dataMocks.allProductsResponse[0]);

      const product = await productsService.getById(productNonExistentId);

      expect(product).equal(dataMocks.allProductsResponse[0]);
    });
  });

  describe('Create/register new product', function () {

    afterEach(() => sinon.restore());

    it('Should return status 201 and product object registred', async function () {
      const productIdNonExistent = 09081989;

      sinon.stub(productsModel, 'getById')
        .resolves(notFoundObjMock);

      const product = await productsService.getById(productIdNonExistent);

      expect(product).equal(notFoundObjMock);
    });
  });
})
