const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { MONGODB_URL } = process.env;

mongoose.connect(MONGODB_URL ? 'mongodb+srv://mesto-database:<Danila_1252>@cluster0.v50ygcd.mongodb.net/mesto-database?retryWrites=true&w=majority' : 'mongodb://localhost:27017/mestodb');

const options = {
  origin: [
    'http://localhost:3000',
    'https://praktikum.tk',
    'https://project.mesto.nomoredomains.club',
    'https://danyaliupinin.github.io',
    'https://mesto-backend-tet4.onrender.com/',
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
