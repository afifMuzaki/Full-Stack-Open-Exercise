const config = require('./utils/config');
const express = require('express');
const app = express();
require('express-async-errors')
const cors = require('cors');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const loginRouter = require('./controllers/login');
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const commentRouter = require('./controllers/comments');

mongoose.set('strictQuery', false);

logger.info('connecting to', config.MONGODB_URI);

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch(err => {
        logger.error('error connecting to MongoDB:', err.message);
    })

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', middleware.userExtractor, blogRouter, commentRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
