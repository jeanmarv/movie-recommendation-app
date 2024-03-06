const express = require('express');
const mainRoute = require('./routes/mainRoute.js');
// import ProductRoute from './Routes/productRoutes';
// import UserRoute from './Routes/userRoutes';
// import OrderRoute from './Routes/orderRoutes';

const app = express();

app.use(express.json());

app.use('/', mainRoute);
// app.use('/register', );
// app.use('/evaluate', );
// app.use('/recommend', );

module.exports = app;
