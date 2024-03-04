const logger = require('./logger');
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

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};