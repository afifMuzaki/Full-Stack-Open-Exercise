const logger = require('./logger');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const requestLogger = (req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        logger.info('Method:', req.method);
        logger.info('Path:  ', req.path);
        logger.info('Body:  ', req.body);
        logger.info('---');
    }

    next();
};

const userExtractor = (req, res, next) => {
    if (!req.token) {
	req.user = null;
    } else {
	req.user = jwt.verify(req.token, process.env.SECRET);
    }

    next();
};

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '');
    } else {
        req.token = null;
    }

    next();
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
        return res.status(400).json({ error: 'expected `username` to be unique' });
    }

    if (error.name === 'JsonWebTokenError') {
        return res.status(400).json({ error: 'token missing or invalid' });
    }

    next(error);
};

module.exports = {
    requestLogger,
    userExtractor,
    tokenExtractor,
    unknownEndpoint,
    errorHandler
};
