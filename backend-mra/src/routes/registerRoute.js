const { Router } = require('express');
const userController = require('../controllers/userController');

// const validateProducts = new ValidateProducts();

const route = Router();

route.post(
  '/', 
  userController.newUserCont,
);

module.exports = route;
