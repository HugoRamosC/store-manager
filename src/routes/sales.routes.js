const express = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = express();

salesRoute.use(express.json());

salesRoute.post('/sales', salesController.newSale);

salesRoute.get('/sales', salesController.getSales);

salesRoute.get('/sales/:id', salesController.getSaleById);

salesRoute.delete('/sales/:id', salesController.deleteSale);

module.exports = salesRoute;