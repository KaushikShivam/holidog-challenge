const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const CustomError = require('./utils/CustomError');
const globalErrorHandler = require('./utils/globalErrorHandler');

const app = express();

const apiRouter = require('./routes');

// Global middlewares
app.use(express.json());

// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

app.use(cors());

// Mount api router
// app.get('/test', (req, res, next) => res.json({ message: 'test passed' }));
app.use('/api/v1', apiRouter);

// Unhandled routes
app.all('*', (req, res, next) => {
  next(new CustomError(`This Url does's exist: ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
