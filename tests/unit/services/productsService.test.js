const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const productsService = require('../../../src/services/productsService');
const productsModel = require('../../../src/models/productsModel');
const dataMocks = require('../../../__tests__/_dataMock');

chai.use(sinonChai);
const { expect } = chai;

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

  // describe('List product by ID', function () {
  //   const notFoundObjMock = {
  //     status: 'PRODUCT_NOT_FOUND', message: 'Product not found',
  //   };

  //   afterEach(() => sinon.restore());

  //   it('Should return not found error object with a non-existent id', async function () {
  //     const productIdNonExistent = 09081989;

  //     sinon.stub(productsModel, 'getById')
  //       .resolves(false);

  //     const error = await productsService.getById(productIdNonExistent);
  //     console.log('testtttt', error);
  //     expect(error).throw(notFoundObjMock);
  //   });

    it('Should return a product with a valid id', async function () {
      const productId = 1;

      sinon.stub(productsModel, 'getById')
        .resolves(dataMocks.allProductsResponse[0]);

      const product = await productsService.getById(productId);

      expect(product).equal(dataMocks.allProductsResponse[0]);
    });
  });

  describe('Create/register new product', function () {
    const notFoundObjMock = {
      status: 404, message: 'Product not found',
    };

    afterEach(() => sinon.restore());

    it('Should return registred product object', async function () {
      const name = 'Produto1';
      const id = 4

      sinon.stub(productsModel, 'createProduct').resolves(id);

      const product = await productsService.createProduct(name);

      expect(product).deep.equal({ 'id': 4, 'name': 'Produto1' });
    });
  });

  describe('Update new product', function () {

    afterEach(() => sinon.restore());

    it('Should return updated object product ', async function () {
      const name = 'Produto1';
      const id = 1;

      sinon.stub(productsModel, 'getById').resolves({ 'id': 1, 'name': 'Produto1' });

      const product = await productsService.updateProduct(id, name);

      expect(product).deep.equal({ 'id': 1, 'name': 'Produto1' });
    });
  });

  describe('Delete product', function () {

    afterEach(() => sinon.restore());

    it('Should return true to object deleted', async function () {
      const id = 1;

      sinon.stub(productsModel, 'deleteProduct').resolves(true);

      const product = await productsService.deleteProduct(id);

      expect(product).equal(true);
    });
  });

  describe('Search product by character`s name', function () {

    afterEach(() => sinon.restore());

    it('Should return object with `martelo` in name', async function () {
      const searchTerm = 'martelo';

      sinon.stub(productsModel, 'searchProduct')
        .resolves(dataMocks.productSearchNameResponse);

      const product = await productsService.searchProduct(searchTerm);

      expect(product).equal(dataMocks.productSearchNameResponse);
    });
  });
})
