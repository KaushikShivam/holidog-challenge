const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Global middlewares
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());

app.get('/test', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Test pass',
  });
});

module.exports = app;
