const { Router } = require('express');
const userController = require('../controllers/userController');
// import UserController from '../controllers/userControllers';
// import ValidateUsers from '../middlewares/validateUsers';
// const validateUsers = new ValidateUsers();

const route = Router();

route.post(
  '/', 
  userController.validateLoginCont,
);

module.exports = route;
