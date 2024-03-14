const { Router } = require('express');
const userController = require('../controllers/userController');
const moviesController = require('../controllers/moviesController');
// import UserController from '../controllers/userControllers';
// import ValidateUsers from '../middlewares/validateUsers';
// const validateUsers = new ValidateUsers();

const route = Router();

route.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});


route.post(
  '/', 
  userController.validateLoginCont,
);

route.get(
  '/', 
  moviesController.getUserMovies,
);

module.exports = route;
