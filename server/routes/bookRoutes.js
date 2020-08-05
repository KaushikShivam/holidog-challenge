const express = require('express');
const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  setAuthorID,
} = require('../controllers/bookController');

const { authenticate } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authenticate);
router.use(setAuthorID);

router.route('/').get(getAllBooks).post(createBook);

router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
