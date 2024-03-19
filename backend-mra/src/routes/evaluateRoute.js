const { Router } = require('express');
const moviesController = require('../controllers/moviesController');

const route = Router();

route.post(
  '/',
  moviesController.addMovieCont,
);

module.exports = route;
