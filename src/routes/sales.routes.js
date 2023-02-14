const express = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = express();

salesRoute.use(express.json());

salesRoute.post('/sales', salesController.newSale);

module.exports = salesRoute;