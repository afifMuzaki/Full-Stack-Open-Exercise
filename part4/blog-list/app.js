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

app.use('/api/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/blogs', blogRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;