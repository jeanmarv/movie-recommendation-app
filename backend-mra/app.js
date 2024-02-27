import express from 'express';
// import ProductRoute from './Routes/productRoutes';
// import UserRoute from './Routes/userRoutes';
// import OrderRoute from './Routes/orderRoutes';

const app = express();

app.use(express.json());

app.use('/', );
app.use('/register', );
app.use('/evaluate', );
app.use('/recommend', );

export default app;
