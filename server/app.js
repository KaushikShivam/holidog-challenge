const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// Global middlewares
app.use(express.json());

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
