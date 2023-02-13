const express = require('express');

const router = express.Router();

const productRoutes = require('./products.routes');
// const talkerRouter = require('./talker.router');

router.use(productRoutes);
// router.use(talkerRouter);

module.exports = router;