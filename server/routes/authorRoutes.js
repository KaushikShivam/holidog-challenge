const express = require('express');
const {
  getAllAuthors,
  createAuthor,
  getAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');

const { authenticate } = require('../controllers/authController');

const bookRouter = require('./bookRoutes');

const router = express.Router();

router.use(authenticate);

router.use('/:authorId/books', bookRouter);

router.route('/').get(getAllAuthors).post(createAuthor);

router.route('/:id').get(getAuthor).patch(updateAuthor).delete(deleteAuthor);

module.exports = router;
