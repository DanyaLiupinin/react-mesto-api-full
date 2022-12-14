const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
// const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
// const userRouter = require('./routes/users');
// const cardRouter = require('./routes/cards');
// const { login, createUser } = require('./controllers/users');
// const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// const NotFoundError = require('./errors/NotFoundError');
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

/*
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
*/

/*
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?\d?\D{1,}#?/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
*/

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
