const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsModel = require('../../../src/models/productsModel');
const connection = require('../../../src/models/connection');
const dataMocks = require('../../../__tests__/_dataMock');

const { expect } = chai;

describe('Products Controller Tests', function () {
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
  });
});