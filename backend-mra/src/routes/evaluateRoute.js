const { Router } = require('express');
const moviesController = require('../controllers/moviesController');

const route = Router();

route.post(
  '/:clientId',
  moviesController.addMovieCont,
);

module.exports = route;
