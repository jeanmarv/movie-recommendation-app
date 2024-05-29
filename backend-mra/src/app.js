const express = require('express');
const mainRoute = require('./routes/mainRoute.js');
const registerRoute = require('./routes/registerRoute.js');
const recommendRoute = require('./routes/recommendRoute.js');
const evaluateRoute = require('./routes/evaluateRoute.js');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', mainRoute);
app.use('/register', registerRoute);
app.use('/evaluate', evaluateRoute);
app.use('/recommend', recommendRoute);

module.exports = app;
