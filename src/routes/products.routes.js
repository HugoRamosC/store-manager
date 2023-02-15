const express = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = express();

productsRoute.use(express.json());

productsRoute.get('/products', productsController.getAll);

productsRoute.get('/products/:id', productsController.getById);

productsRoute.post('/products', productsController.createProduct);

productsRoute.put('/products/:id', productsController.updateProduct);

module.exports = productsRoute;