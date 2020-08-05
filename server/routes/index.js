const express = require('express');
const userRouter = require('./userRoutes');
const authorRouter = require('./authorRoutes');

const router = express.Router();

router.use('/users', userRouter);
router.use('/authors', authorRouter);

module.exports = router;
