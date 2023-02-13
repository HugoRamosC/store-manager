const express = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = express();

productsRoute.use(express.json());

productsRoute.get('/products', productsController.getAll);

productsRoute.get('/products/:id', productsController.getById);

module.exports = productsRoute;