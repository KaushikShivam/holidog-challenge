const express = require('express');
const userRouter = require('./userRoutes');
const authorRouter = require('./authorRoutes');
const bookRouter = require('./bookRoutes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/authors', authorRouter);
router.use('/books', bookRouter);

module.exports = router;
