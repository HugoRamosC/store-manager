const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const salesController = require('../../../src/controllers/salesController');
const salesService = require('../../../src/services/salesService');
const dataMocks = require('../../../__tests__/_dataMock');

chai.use(sinonChai);
const { expect } = chai;

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_DELETED_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;

describe('Sales Controller Tests', function () {
  describe('Register/create new sale', function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return status 201 and registred sale', async function () {
      sinon.stub(salesService, 'newSale')
        .resolves(dataMocks.saleCreateResponse);

      await salesController.newSale(req, res);

      expect(res.status).calledWith(HTTP_CREATED_STATUS);
      expect(res.json).calledWithExactly(dataMocks.saleCreateResponse);
    });
  });

  describe('List sales', function () {
    const req = {};
    const res = {};
    const next = (params) => params;

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => sinon.restore());

    it('Should return status 200 and all sales list', async function () {
      sinon.stub(salesService, 'getSales')
        .resolves(dataMocks.allSalesList);

      await salesController.getSales(req, res);

      expect(res.status).calledWith(HTTP_OK_STATUS);
      expect(res.json).calledWithExactly(dataMocks.allSalesList);
    });

    // it('Should return status 200 and a sale by id', async function () {
    //   sinon.stub(salesService, 'getSaleById')
    //     .resolves(dataMocks.allSalesList[2]);

    //     await salesController.getSaleById(req, res, next);

    //   expect(res.status).calledWith(HTTP_OK_STATUS);
    //   expect(res.json).calledWithExactly(dataMocks.allSalesList[2]);
    // });
  });

  // describe('Delete sale', function () {
  //   const req = {};
  //   const res = {};
  //   const next = (params) => params;

  //   beforeEach(() => {
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //   });

  //   afterEach(() => sinon.restore());

  //   it('Should return status 204', async function () {
  //     sinon.stub(salesService, 'deleteSale')
  //       .resolves(true);

  //     await salesController.deleteSale(req, res, next);

  //     expect(res.status).calledWith(HTTP_DELETED_STATUS);
  //   });
  // });

  // describe('Update sale', function () {
  //   const req = {};
  //   const res = {};
  //   const next = (params) => params;

  //   beforeEach(() => {
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();
  //   });

  //   afterEach(() => sinon.restore());

  //   it('Should return status 200 and updated sale object', async function () {
  //     sinon.stub(salesService, 'updateSale')
  //       .resolves(dataMocks.updatedSaleObj);

  //     await salesController.updateSale(req, res, next);

  //     expect(res.status).calledWith(HTTP_OK_STATUS);
  //     expect(res.json).calledOnceWithExactly(dataMocks.updatedSaleObj)
  //   });
  // });
})
