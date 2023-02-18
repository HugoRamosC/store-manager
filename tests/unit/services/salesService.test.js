const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const salesService = require('../../../src/services/salesService');
const salesModel = require('../../../src/models/salesModel');
const dataMocks = require('../../../__tests__/_dataMock');

chai.use(sinonChai);
const { expect } = chai;

describe('Sales Service Tests', function () {
  const notFoundObjMock = {
    status: 'PRODUCT_NOT_FOUND', message: 'Product not found',
  };

  describe('Register/create new sale', function () {

    afterEach(() => sinon.restore());

    it('Should return object sale', async function () {
      const saleCreateResponse = {
        id: 3,
        itemsSold: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 5 },
        ]
      };
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
      sinon.stub(salesModel, 'newSale').resolves(saleCreateResponse);
      sinon.stub(salesModel, 'saleRegister').resolves(saleCreateResponse.id);

      const sale = await salesService.newSale(saleDescription);

      expect(sale).deep.equal(saleCreateResponse);
    });

  //   it('Should throw not found product error', async function () {
  //     sinon.stub(salesModel, 'newSale').resolves(notFoundObjMock);

  //     const sale = await salesService
  //       .newSale(dataMocks.saleDescriptionNotFoundProduct);

  //     expect(sale).throw(notFoundObjMock);
  //   });
  });

  describe('List sales', function () {

    afterEach(() => sinon.restore());

    it('Should return all sales', async function () {
      sinon.stub(salesModel, 'getSales').resolves(dataMocks.allSalesList);

      const sale = await salesService.getSales();

      expect(sale).deep.equal(dataMocks.allSalesList);
    });

    it('Should return a sale by id', async function () {
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
      sinon.stub(salesModel, 'getSaleById')
        .resolves(allSalesList[2]);

      const sale = await salesService.getSaleById(2);

      expect(sale).deep.equal(allSalesList[2]);
    });

    // it('Should throw not found error by sale id nonexistent', async function () {
    //   sinon.stub(salesModel, 'getSaleById').resolves(notFoundObjMock);

    //   const sale = await salesService.getSaleById(09081989);

    //   expect(sale).throw(notFoundObjMock);
    // });
  });

  describe('Delete sale', function () {

    afterEach(() => sinon.restore());

    it('Should return true to deleted sale', async function () {
      sinon.stub(salesModel, 'deleteSale').resolves(true);

      const sale = await salesService.deleteSale(2);

      expect(sale).equal(true);
    });
  });

  describe('Update sale', function () {

    afterEach(() => sinon.restore());

    it('Should return updated sale object', async function () {
      const updatedSaleObj = {
        "id": 1,
        "itemsSold": [
          {
            "productId": 1,
            "quantity": 10
          },
          {
            "productId": 2,
            "quantity": 50
          }
        ]
      };
      const saleUpdateDescription = [
        {
          "productId": 1,
          "quantity": 10
        },
        {
          "productId": 2,
          "quantity": 50
        }
      ];
      const updatedSale = {
        saleId: updatedSaleObj.id,
        itemsUpdated: updatedSaleObj.itemsSold,
      }
      sinon.stub(salesModel, 'updateSale').resolves(updatedSale);

      const sale = await salesService.updateSale(1, saleUpdateDescription);

      expect(sale).deep.equal(updatedSale);
    });
  });
})
