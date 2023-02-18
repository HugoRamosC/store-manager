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
      sinon.stub(salesModel, 'newSale').resolves(dataMocks.saleCreateResponse);
      sinon.stub(salesModel, 'saleRegister').resolves(dataMocks.saleCreateResponse.id);

      const sale = await salesService.newSale(dataMocks.saleDescription);

      expect(sale).deep.equal(dataMocks.saleCreateResponse);
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
      sinon.stub(salesModel, 'getSaleById')
        .resolves(dataMocks.allSalesList[2]);

      const sale = await salesService.getSaleById(2);

      expect(sale).deep.equal(dataMocks.allSalesList[2]);
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
      const updatedSale = {
        saleId: dataMocks.updatedSaleObj.id,
        itemsUpdated: dataMocks.updatedSaleObj.itemsSold,
      }
      sinon.stub(salesModel, 'updateSale').resolves(updatedSale);

      const sale = await salesService.updateSale(1, dataMocks.saleUpdateDescription);

      expect(sale).deep.equal(updatedSale);
    });
  });
})
