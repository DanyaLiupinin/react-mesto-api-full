const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const status = require('../utils/status');

const getCards = (req, res, next) => {
  Card.find({})
    // .populate(['owner'])
    .then((data) => {
      res.status(status.OK).send(data);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((data) => {
      res.status(status.CREATED).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;

  Card.findById(req.params.cardId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (!data.owner.equals(userId)) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((card) => {
          res.status(status.OK).send({ card });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((cardLike) => {
      res.status(status.CREATED).send(cardLike);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  const userId = req.user._id;
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((cardLike) => {
      res.status(status.OK).send(cardLike);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
