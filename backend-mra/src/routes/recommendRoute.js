const { Router } = require('express');
const moviesController = require('../controllers/moviesController');

const route = Router();

route.get(
  '/:clientId', 
  moviesController.getUserMovies,
//   validateProducts.validateAmount, 
//   productcontroller.postProduct,
);

module.exports = route;
