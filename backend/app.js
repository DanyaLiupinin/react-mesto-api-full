const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

mongoose.connect('mongodb://localhost:27017/mestodb');

const options = {
  origin: [
    'http://localhost:3000',
    'https://praktikum.tk',
    'https://project.mesto.nomoredomains.club',
    'https://danyaliupinin.github.io',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));
app.listen(3000);
app.use(bodyParser.json());
app.use(requestLogger);
app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
