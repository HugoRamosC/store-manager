const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesModel = require('../../../src/models/salesModel');
const connection = require('../../../src/models/connection');
const dataMocks = require('../../../__tests__/_dataMock');

const { expect } = chai;

describe('Sales Model Tests', function () {
  afterEach(() => sinon.restore());
  
  describe('Register new Sale', function () {
    it('Should return registered new sale id', async function () {
      const queryResponse = {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 3,
        info: '',
        serverStatus: 2,
        warningStatus: 0
      }

      sinon.stub(connection, 'execute').resolves([queryResponse]);

      const newSale = await salesModel.saleRegister();

      expect(newSale).equal(queryResponse.insertId);
    });
  });

  it('Should return true to new sale registered', async function () {
    sinon.stub(connection, 'execute').resolves(true);

    const newSale = await salesModel.newSale(3, dataMocks.rightSaleBody);

    expect(newSale).equal(true);
  });


  describe('List sales', function () {
    it('Should return all sales list', async function () {
      sinon.stub(connection, 'execute')
        .resolves([dataMocks.allSalesList]);

      const product = await salesModel.getSales();

      expect(product).equal(dataMocks.allSalesList);
    });

    it('Should return a sale by Id', async function () {
      const id = 2
      const allSalesList = [
        {
          "saleId": 1,
          "date": "2023-02-17T19:32:24.000Z",
          "productId": 1,
          "quantity": 5
        },
        {
          "saleId": 1,
          "date": "2023-02-17T19:32:24.000Z",
          "productId": 2,
          "quantity": 10
        },
        {
          "saleId": 2,
          "date": "2023-02-17T19:32:24.000Z",
          "productId": 3,
          "quantity": 15
        },
        {
          "saleId": 3,
          "date": "2023-02-18T19:55:51.000Z",
          "productId": 1,
          "quantity": 1
        },
        {
          "saleId": 3,
          "date": "2023-02-18T19:55:51.000Z",
          "productId": 2,
          "quantity": 5
        }
      ];
      sinon.stub(connection, 'execute')
        .resolves([allSalesList[id]]);

      const product = await salesModel.getSaleById(id);

      expect(product).deep.equal(allSalesList[id]);
    });
  });

  describe('Delete sale', function () {
    it('Should return true to deteled sale', async function () {
      sinon.stub(connection, 'execute').resolves(true);

      const response = await salesModel.deleteSale(1);

      expect(response).equal(true);
    });
  });

  describe('Update sale', function () {
    it('Should return true to update sale', async function () {
      const saleDescription = [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ];
      sinon.stub(connection, 'execute').resolves(true);

      const response = await salesModel
        .updateSale(1, saleDescription);

      expect(response).equal(true);
    });
  });
});