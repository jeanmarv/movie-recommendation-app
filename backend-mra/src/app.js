const express = require('express');
const mainRoute = require('./routes/mainRoute.js');
const registerRoute = require('./routes/registerRoute.js');
const recommendRoute = require('./routes/recommendRoute.js');

const app = express();

app.use(express.json());

app.use('/', mainRoute);
app.use('/register', registerRoute);
// app.use('/evaluate', );
app.use('/recommend', recommendRoute);

module.exports = app;
