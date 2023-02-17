const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const dataMocks = require('../../../__tests__/_dataMock');

const { expect } = chai;

describe('Products Model Tests', function () {
  afterEach(() => sinon.restore());
  
  describe('List all product', function () {
    it('Should return all products', async function () {
      sinon.stub(connection, 'execute')
        .resolves([dataMocks.allProductsResponse]);

      const products = await productsModel.getAll();

      expect(products).equal(dataMocks.allProductsResponse);
    });
  });

  describe('List product by ID', function () {
    it('Should return requisited product', async function () {
      sinon.stub(connection, 'execute')
        .resolves([[dataMocks.allProductsResponse[0]]]);

      const product = await productsModel.getById(1);

      expect(product).equal(dataMocks.allProductsResponse[0]);
    });

    it('Should return false to non-existent product', async function () {
      sinon.stub(connection, 'execute')
        .resolves([[false]]);

      const product = await productsModel.getById(09081989);

      expect(product).equal(false);
    });
  });

  describe('Create/register new product', function () {
    it('Should return new product id', async function () {
      const newId = 4;
      const connectionResponse = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 4,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }

      sinon.stub(connection, 'execute').resolves([connectionResponse]);

      const response = await productsModel.createProduct('Produto1');
      console.log('modelllll', response);

      expect(response).equal(connectionResponse.insertId);
    });
  });

  describe('Update product', function () {
    it('Should return true', async function () {
      sinon.stub(connection, 'execute')
        .resolves(true);

      const response = await productsModel.updateProduct(1, 'produto1');

      expect(response).equal(true);
    });
  });

  describe('Delete product', function () {
    it('Should return true', async function () {
      sinon.stub(connection, 'execute')
        .resolves(true);

      const response = await productsModel.deleteProduct(1);

      expect(response).equal(true);
    });
  });

  describe('Search product', function () {
    it('Should return true', async function () {
      sinon.stub(connection, 'execute')
        .resolves([dataMocks.productSearchNameResponse]);

      const response = await productsModel.searchProduct('mart');

      expect(response).equal(dataMocks.productSearchNameResponse);
    });
  });
});