const { Router } = require('express');
// import ProductController from '../controllers/productControllers';
// import ValidateProducts from '../middlewares/validateProducts';

// const productcontroller = new ProductController();
// const validateProducts = new ValidateProducts();

const route = Router();

route.post(
  '/register', 
//   validateProducts.validateName,
//   validateProducts.validateAmount, 
//   productcontroller.postProduct,
);

module.exports = route;
