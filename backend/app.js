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

const { MONGO_URL } = process.env;

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const options = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://praktikum.tk',
    'https://project.mesto.nomoredomains.club',
    'https://danyaliupinin.github.io',
    'https://mesto-frontend-mdzl.onrender.com',
    'https://danyaliupinin.github.io/react-mesto-api-full',
    'https://www.dkovandeveloper.online/',
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
app.use(router);
app.use(requestLogger);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
